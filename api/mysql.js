const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const version = require('./config.js');
const Joi = require('joi');

let versionFile = path.join(__dirname, '../data/db.json');
let logFile = path.join(__dirname, '../data/db_log.json');
let versionInfo = version.readSync(versionFile);
var currentSchema, currentBuild, currentVersion;
var serials = [];

const hostName = versionInfo.connection.host || 'localhost';
const userName = versionInfo.connection.user || 'root';
const pw = versionInfo.connection.password || 'qwerty123';
const connection = mysql.createConnection({
  host: hostName,
  user: userName,
  password: pw, // user password
  multipleStatements: true
}); newConnection();

if(versionInfo.hasOwnProperty('schema')){
  currentSchema = versionInfo.schema;
  use(versionInfo.schema);
};
if(versionInfo.hasOwnProperty('build')){
  currentBuild = versionInfo.build;
  console.log('### current build:', versionInfo.build, ' ... @mysql.js');
};
if(versionInfo.hasOwnProperty('version')){
  currentVersion = versionInfo.version;
  console.log('### current version:', versionInfo.version, ' ... @mysql.js');
};
if(versionInfo.hasOwnProperty('serial-list')){
  serials = versionInfo["serial-list"];
  console.log('### total', serials.length, 'records in students ... @mysql.js');
};

let log = [];
let affected = 0;
let monitor = new EventEmitter();



// ################# QUERIES ####################

function makeTables(year, res) {
  // resumeConnection();
  logRefresh();
  addMonitor(monitor, res);

  currentSchema = 'bitsolDB_20' + String(year) + '_test04';
  currentVersion = String(year) + ".0";
  currentBuild = 0;
  serials = [];
  versionInfo = {
    "schema": currentSchema,
    "version": currentVersion,
    "build": currentBuild,
    "date": new Date(),
    "serial-list": serials
  }
  
  goQuery(`DROP DATABASE IF EXISTS ${currentSchema};`);
  goQuery(`CREATE DATABASE ${currentSchema};`);
  use(currentSchema);

  goQuery('CREATE TABLE `students` (`student_id` INT NOT NULL AUTO_INCREMENT,`serial_number` VARCHAR(20) NOT NULL,`student_name` VARCHAR(15) NOT NULL,`room_name` VARCHAR(6),`gender` CHAR(1) NOT NULL,`term` CHAR(2) NOT NULL,`student_number` VARCHAR(15) NOT NULL, `faculty` VARCHAR(15), `major` VARCHAR(15), `phone` VARCHAR(17),`indate` VARCHAR(10),PRIMARY KEY (`student_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  goQuery('CREATE TABLE `students_log` (`log_id` INT NOT NULL AUTO_INCREMENT,`time` VARCHAR(25) NOT NULL,`target_a` INT NOT NULL,`target_b` INT DEFAULT NULL,`adjustment` VARCHAR(6) NOT NULL,`description` TEXT,`client_id` INT NOT NULL,`client` VARCHAR(25) NOT NULL,PRIMARY KEY(`log_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  var monthIndex = [];
  for(i = 1; i < 13; i++){
    monthIndex.push(String(year) + '_' + String(i));
  }
  for(i = 1; i < 4; i++){
    monthIndex.push( String( parseInt(year)+1 ) + '_' + String(i));
  }
  goQuery('CREATE TABLE `refg` (`student_id` INT NOT NULL AUTO_INCREMENT,PRIMARY KEY (`student_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');
  for(i = 0; i < 15; i++){
    goQuery(`ALTER TABLE refg ADD COLUMN ${monthIndex[i]} INT NOT NULL DEFAULT '0';`);
  }

  goQuery('CREATE TABLE `refg_log` (`log_id` INT NOT NULL AUTO_INCREMENT,`time` VARCHAR(25) NOT NULL,`target` VARCHAR(20) NOT NULL,`month` VARCHAR(5) NOT NULL,`adjustment` CHAR(1) NOT NULL,`amount` INT NOT NULL,`result` INT NOT NULL,`client_id` INT NOT NULL,`client` VARCHAR(25) NOT NULL,PRIMARY KEY (`log_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  goQuery('CREATE TABLE `room` (`room_id` INT NOT NULL AUTO_INCREMENT,`room_name` CHAR(6) NOT NULL,`building` CHAR(1) NOT NULL,`floor` CHAR(2) NOT NULL,`room_number` CHAR(2) NOT NULL,`seat` CHAR(1) NOT NULL,`student_id` INT DEFAULT NULL,PRIMARY KEY (`room_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  close();
}

function firstData(worksheet, res){
  // resumeConnection();
  logRefresh();
  addMonitor(monitor, res);
  
  use(currentSchema);
  
  var def = "DEFAULT";
  var ab = ["A","B"];
  var floor_A = ["01", "02", "03", "04", "05", "06", "07", "B1"];
  var count_A = [44, 44, 44, 44, 45, 46, 46, 13]; // ++
  var floor_B = ["01", "02", "03", "04", "05", "06", "07"];
  var count_B = [22, 26, 26, 26, 26, 27, 27]; // ++
  var room_name, building, floor, room_number, seat;

  building = "A";
  for(f = 0; f < floor_A.length; f++){ // 층 수 만큼
    floor = floor_A[f];
    for(r = 1; r < count_A[f]; r++){ // 방 갯수만큼
      room_number = String(r);
      if(room_number.length === 1){
        room_number = "0" + room_number;
      }
      for(i=0; i < ab.length; i++){
        seat = ab[i];
        room_name = building + floor + room_number + seat;
        insertQuery("room", def, room_name, building, floor, room_number, seat, def);
      }
    }
  }
  building = "B";
  for(f = 0; f < floor_B.length; f++){ // 층 수 만큼
    floor = floor_B[f];
    for(r = 1; r < count_B[f]; r++){ // 방 갯수만큼
      room_number = String(r);
      if(room_number.length === 1){
        room_number = "0" + room_number;
      }
      for(i=0; i < ab.length; i++){
        seat = ab[i];
        room_name = building + floor + room_number + seat;
        insertQuery("room", def, room_name, building, floor, room_number, seat, def);
      }
    }
  }

  var serial_number, student_name, gender, term, student_number, faculty, major, phone, indate;

  for (i = 0; i < worksheet.length; i++){ // 학생수만큼
    serial_number = serialMaker(worksheet[i].차수, worksheet[i].성별, worksheet[i].학번);
    serials.push(serial_number);

    student_name = worksheet[i].성명;
    room_name = worksheet[i].확정방;
    gender = worksheet[i].성별;
    term = worksheet[i].기간;
    student_number = worksheet[i].학번;
    faculty = worksheet[i].대학;
    major = worksheet[i].학과;
    phone = worksheet[i].HP;
    indate = worksheet[i].입사일자;
    
    insertQuery("students", def, serial_number, student_name, room_name, gender, term, student_number, faculty, major, phone, indate);

    insertQuery("refg", def, def, def, def, def, def, def, def, def, def, def, def, def, def, def, def);

    updateQuery("room", "room_name", room_name, "student_id", i+1);
  }
  
  versionUp();
  close();
}

function updateRefg(student_id, refgTerm, amount, adjust, res){
  // resumeConnection();
  logRefresh();
  addMonitor(monitor, res);
  
  use(currentSchema);

  let history = getData00();  // return 0
  var update;

  if(adjust == "+"){
    update = history + amount;
  }else {
    update = history - amount;
  }

  updateQuery("refg", "student_id", student_id, refgTerm, update);

  versionUp();
  close();
}

function searchStudent(keyword, res){
  // resumeConnection();
  logRefresh();
  addMonitor(monitor, res);
  
  use(currentSchema);

  let key = keyword;
  let joiResult = searchKeySchema.validate({keyword:key});
  if (joiResult.error){
    res.json({
      arg: []
    });
  }else {
    key = quote(keyword);

    let query = "SELECT r.room_id, r.room_name, s.student_name, s.term, s.student_number, s.faculty, s.major, s.phone, s.indate, rf.* FROM room r JOIN students s USING (student_id) JOIN refg rf USING (student_id) WHERE ( ";
    query = query.concat("r.room_name REGEXP ", key, " || ");
    query = query.concat("s.student_name REGEXP ", key, ");")
  
    select(query);
  }
}

// ######## QUERY METHODS #########

function serialMaker(chasoo, gender, student_number) {
  var result = chasoo[2];
  result += chasoo[3];
  result += chasoo[4];
  result += chasoo[5];
  result += chasoo[8];
  result += chasoo[9];
  result += gender;
  result += student_number;
  return result
}

function logRefresh(){
  log = [];
  affected = 0;
  monitor = new EventEmitter();
}

function versionUp(){
  currentBuild += 1;
  currentVersion = currentVersion[0] + currentVersion[1] + "." + String(currentBuild);
  versionInfo = {
    "schema": currentSchema,
    "version": currentVersion,
    "build": currentBuild,
    "date": new Date(),
    "serial-list": serials
  };
}

function getData00(){
  var result = 0;
  return result
}

const searchKeySchema = Joi.object({
  keyword: Joi.string()
    .alphanum()
    .min(1)
    .required()
});


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
  monitor.on('select', (arg) => {
    console.log('$$$ SEARCH REQUEST ... @mysql.js/monitor');
    res.json({
      arg
    })
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
    console.log("### version updated:", versionInfo.version);
    console.log('### total', serials.length, 'records in students ... @mysql.js');

    // ----------- update log file
    // let timestamp = String(versionInfo.date.getTime());
    // let author = "gunn"
    // var logInfo = new Object;
    // logInfo[timestamp] = {
    //   "schema": versionInfo.schema,
    //   "version": versionInfo.version,
    //   author,
    //   "time": versionInfo.date,
    //   affected,
    //   log
    // };  version.update(logFile, logInfo);

    // pauseConnection();
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
  var convertedStr = backTick(schema);
  goQuery(`USE ${convertedStr};`);
  console.log('$$$ USING', schema, ' ... @mysql.js/use');
}
function close(){
  var convertedStr = backTick(currentSchema);
  connection.query(`USE ${convertedStr};`, (error, results, fields) =>{
    if(error) {
      monitor.emit('query error', error);
    } 
    monitor.emit('query end');
    console.log('$$$ QUERY END ... @mysql.js/close');
  });
}
function goQuery(query){
  connection.query(query, (error, results, fields) =>{
    if(error) {
      monitor.emit('query error', error);
    }
    monitor.emit('query success', results);
  });
}
function insertQuery(tableName, ...args){
  var data, query;
  let table = backTick(tableName);
  query = "INSERT INTO " + table + " VALUES (";
  for (k = 1; k < arguments.length; k++){ // 칼럼수만큼
    data = arguments[k];
    if (data === "DEFAULT"){
      query = query.concat(data,",");
    }else if (typeof(data) === "number"){
      query = query.concat(data,",");
    }else {
      query = query.concat(quote(data),",");
    }}
  query = query.slice(0,-1);
  query += ");" ;
  goQuery(query);
}
function updateQuery(tableName, condition, match, columnName, data){
  var query = "UPDATE " + tableName + " SET " + columnName + " = ";
  if (data === "DEFAULT"){
    query = query.concat(data);
  }else if (typeof(data) === "number"){
    query = query.concat(data);
  }else {
    query = query.concat(quote(data));
  }
  query = query.concat(" WHERE " + condition + " = ");
  if (match === "DEFAULT"){
    query = query.concat(match);
  }else if (typeof(match) === "number"){
    query = query.concat(match);
  }else {
    query = query.concat(quote(match));
  }
  query = query.concat(";");
  goQuery(query);
}
function select(query){
  connection.query(query, (error, results, fields) =>{
    if(error) {
      monitor.emit('query error', error);
    }
    monitor.emit('select', results);
    console.log(results);
  });
}



// ========================= CONNECTION SETTING

function newConnection(){
  connection.connect((err) => { // connection status
    if (err) {
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        console.log('$$$ CONNECTION LOST ... @mysql.js/newConnection :\n', err);
        console.log('\n$$$ RECONNECTING ... @mysql.js/newConnection :\n');
        return newConnection();
      } else {
        console.error('$$$ CONNECTION ERROR ... @mysql.js/connection :\n' + err.stack);
      }
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
module.exports.searchStudent = searchStudent;
module.exports.updateRefg = updateRefg;

// pauseConnection();
// reConnect();