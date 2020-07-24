const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty123', // user password
  multipleStatements: true
}); 
newConnection();

const version = require('../api/config.js')
let versionFile = path.join(__dirname, './db.json');
let logFile = path.join(__dirname, './db_log.json');
let versionInfo = version.readSync(versionFile);
var currentSchema, currentBuild, currentVersion;

if(versionInfo.hasOwnProperty('schema')){
  currentSchema = versionInfo.schema;
  use(versionInfo.schema);
};
if(versionInfo.hasOwnProperty('build')){
  currentBuild = versionInfo.build;
  console.log('$$$ current build:', versionInfo.build, ' ... @mysql.js');
};
if(versionInfo.hasOwnProperty('version')){
  currentVersion = versionInfo.version;
  console.log('$$$ current version:', versionInfo.version, ' ... @mysql.js');
};



let log = [];
let affected = 0;
let monitor = new EventEmitter();
// common resources



// ################# QUERIES ####################

function makeTables(year, res) {
  log = [];
  affected = 0;
  monitor = new EventEmitter();
  addMonitor(monitor, res);
  resumeConnection();
  
  const schema = 'bitsolDB_20' + String(year) + '_test02';

  versionInfo = {
    "schema": schema,
    "version": String(year) + ".0",
    "build": 0,
    "date": new Date()
  }
  currentSchema = versionInfo.schema;
  currentBuild = versionInfo.build;
  currentVersion = versionInfo.version;

  goQuery(`DROP DATABASE IF EXISTS ${schema};`);
  goQuery(`CREATE DATABASE ${schema};`);
  use(schema);

  goQuery('CREATE TABLE `students` (`student_id` INT NOT NULL AUTO_INCREMENT,`serial_number` VARCHAR(20) NOT NULL,`name` VARCHAR(15) NOT NULL,`gender` CHAR(1) NOT NULL,`term` CHAR(2) NOT NULL,`student_number` VARCHAR(15) NOT NULL,`phone` VARCHAR(17),`indate` VARCHAR(10),PRIMARY KEY (`student_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  goQuery('CREATE TABLE `students_log` (`log_id` INT NOT NULL AUTO_INCREMENT,`time` VARCHAR(25) NOT NULL,`target_a` INT NOT NULL,`target_b` INT DEFAULT NULL,`adjustment` VARCHAR(6) NOT NULL,`description` TEXT,`client_id` INT NOT NULL,`client` VARCHAR(25) NOT NULL,PRIMARY KEY(`log_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  var monthIndex = [];
  for(i = 1; i < 13; i++){
    monthIndex.push(String(year) + '_' + String(i));
  }
  for(i = 1; i < 4; i++){
    monthIndex.push(String(year+1) + '_' + String(i));
  }
  goQuery('CREATE TABLE `refg` (`student_id` INT NOT NULL AUTO_INCREMENT,PRIMARY KEY (`student_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');
  for(i = 0; i < 15; i++){
    goQuery(`ALTER TABLE refg ADD COLUMN ${monthIndex[i]} INT NOT NULL DEFAULT '0';`);
  }

  goQuery('CREATE TABLE `refg_log` (`log_id` INT NOT NULL AUTO_INCREMENT,`time` VARCHAR(25) NOT NULL,`target` VARCHAR(20) NOT NULL,`month` VARCHAR(5) NOT NULL,`adjustment` CHAR(1) NOT NULL,`amount` INT NOT NULL,`result` INT NOT NULL,`client_id` INT NOT NULL,`client` VARCHAR(25) NOT NULL,PRIMARY KEY (`log_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  lastQuery('CREATE TABLE `room` (`room_id` INT NOT NULL AUTO_INCREMENT,`room_name` CHAR(6) NOT NULL,`building` CHAR(1) NOT NULL,`floor` CHAR(2) NOT NULL,`room_number` CHAR(2) NOT NULL,`seat` CHAR(1) NOT NULL,`student_id` INT DEFAULT NULL,PRIMARY KEY (`room_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');
}

function firstData(worksheet, res){
  log = [];
  affected = 0;
  monitor = new EventEmitter();
  addMonitor(monitor, res);
  resumeConnection();

  use('bitsolDB_2017_test00');





  console.log(worksheet[0]);

  var TargetTable
  var name, gender, term, student_number, phone, indate, serial_number;
  
  for(i = 0; i < worksheet.length; i++){
    TargetTable = backTick('students');
    name = quote(worksheet[i].성명);
    gender = quote(worksheet[i].성별);
    term = quote(worksheet[i].기간);
    student_number = quote(worksheet[i].학번);
    phone = quote(worksheet[i].HP);
    indate = quote(worksheet[i].입사일자);
    serial_number = serialMaker(worksheet[i].차수, worksheet[i].성별, worksheet[i].학번);
  
    var query = "INSERT INTO " + TargetTable + " VALUES (DEFAULT," + serial_number +","+ name +","+ gender +","+ term +","+ student_number +","+ phone +","+ indate + ");"
  
    goQuery(query);
  }
  


  
}

// ######### QUERY METHODS ##########

function serialMaker(chasoo, gender, student_number) {
  var result = chasoo[2];
  result += chasoo[3];
  result += chasoo[4];
  result += chasoo[5];
  result += chasoo[8];
  result += chasoo[9];
  result += gender;
  result += student_number;
  result = quote(result);
  return result
}












// ========================= MONITOR SETTING

function addMonitor(monitor, res){
  monitor.on('query error', (arg) => {
    console.log('$$$ QUERY ERROR ... @mysql.js/monitor');
    console.log(arg);
  });
  monitor.on('query success', (arg) => {
    console.log('$$$ QUERY SUCCESS ... @mysql.js/monitor\n   affected: ', arg.affectedRows);
    affected += arg.affectedRows;
    log.push(arg);
  });
  monitor.on('query end', (arg) => {
    // ----------- response methods
    res.json({
      "status": 200,
      affected,
      log
    })
    console.log('### FUNCTION COMPLETE ... @mysql.js/monitor\n   affected:', affected);

    // ----------- update version config file
    version.update(versionFile, versionInfo);
    console.log(versionInfo);

    // ----------- update log file
    let timecode = String(versionInfo.date.getTime());
    let author = "gunn"
    var logInfo = new Object;
    logInfo[timecode] = {
      "schema": versionInfo.schema,
      "version": versionInfo.version,
      author,
      affected,
      log
    }; version.update(logFile, logInfo);

    pauseConnection();
  });
}



// ========================= QUERY SETTING

function backTick(string){
  let converted = '\`' + string + '\`';
  return converted
}
function quote(string){
  let converted = '\'' + string + '\'';
  return converted
}
function use(schema){
  var convertedStr = backTick(schema)
  goQuery(`USE ${convertedStr};`);
  console.log('$$$ USING', schema, ' ... @mysql.js/use');
}
function goQuery(query){
  connection.query(query, (error, results, fields) =>{
    if(error) {
      monitor.emit('query error', error);
    }
    monitor.emit('query success', results);
  });
}
function lastQuery(query){
  connection.query(query, (error, results, fields) =>{
    if(error) {
      monitor.emit('query error', error);
    }
    monitor.emit('query success', results);
    monitor.emit('query end');
  });
}



// ========================= CONNECTION SETTING

function newConnection(){
  connection.connect((err) => { // connection status
    if (err) {
      console.error('$$$ error connecting ... @mysql.js/connection :\n' + err.stack);
      return;
    } console.log('$$$ CONNECTED: ' + connection.threadId + '  ... @mysql.js/connection');
  });
}
function endConnection(){
  connection.end();
  console.log('$$$ CONNECTION ENDED ... @mysql.js/connection');
}
function pauseConnection(){
  connection.pause();
  console.log('$$$ CONNECTION PAUSED ... @mysql.js/connection');
}
function resumeConnection(){
  connection.resume();
  if(connection.threadId){
  console.log('$$$ RESUME CONNECTION:' + connection.threadId + ' ... @mysql.js/connection');}
}



// ========================= EXPORT SETTING

module.exports.makeTables = makeTables;
module.exports.firstData = firstData;
module.exports.use = use;


pauseConnection();