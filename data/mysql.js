const EventEmitter = require('events');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwerty123', // user password
  multipleStatements: true
}); newConnection();

let log = [];
let affected = 0;
let monitor = new EventEmitter();




// ################# QUERIES ####################

function makeTables(year, res) {
  log = [];
  affected = 0;
  monitor = new EventEmitter();
  addListener(monitor, res);

  resumeConnection();

  const schemaSelection = 'bitsolDB_20' + String(year) + '_test00';
  const schema = backTick(schemaSelection);

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

function newStudent(){
  log = [];
  affected = 0;
  monitor = new EventEmitter();
  addListener(monitor, res);

  resumeConnection();



}



// ========================= MONITOR SETTING

function addListener(monitor, res){
  monitor.on('query error', (arg) => {
    console.log('### QUERY ERROR ###');
    console.log(arg);
  });
  monitor.on('query success', (arg) => {
    console.log('affected before plus:', affected);
    console.log('- QUERY SUCCESS / affected: ', arg.affectedRows);
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
    console.log('---- FUNCTION COMPLETE ----\naffected:', affected);
    pauseConnection();
  });
}



// ========================= QUERY SETTING

function backTick(string){
  let converted = '\`' + string + '\`';
  return converted
}
function use(schema){
  goQuery(`USE ${schema};`);
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
function singleQuery(query){ // 아직 건들지도 않았어
  connection.query(query, (error, results, fields) =>{
    if(error) {
      monitor.emit('query error', error);
    }
    monitor.emit('query success', results);
  });
}



// ========================= CONNECTION SETTING

function newConnection(){
  connection.connect((err) => { // connection status
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    } console.log('####### connected as id ' + connection.threadId + ' #######');
  });
}
function endConnection(){
  connection.end();
  console.log('########## connection ended');
}
function pauseConnection(){
  connection.pause();
  console.log('########## CONNECTION PAUSED \n\n\n');
}
function resumeConnection(){
  connection.resume();
  if(connection.threadId){
  console.log('####### RESUME CONNECTION:' + connection.threadId + ' #######');}
}



// ========================= EXPORT SETTING

module.exports.initDB = makeTables;
module.exports.newStudent = newStudent;



pauseConnection();