const EventEmitter = require('events');
const mysql = require('mysql');
const config = require('./config.js');
const Joi = require('joi');
const randomstring = require("randomstring");

const hostName = config.dbinfo.connection.host || 'localhost';
const userName = config.dbinfo.connection.user || 'root';
const pw = config.dbinfo.connection.password || 'qwerty123';
const connection = mysql.createConnection({
  host: hostName,
  user: userName,
  password: pw, // user password
  multipleStatements: true }); 
newConnection();

console.log("DATABASE =================================");
let currentSchema = versionCheck('schema');
let currentVersion = versionCheck('version');
let commits = versionCheck('commit');
let refgTerm = versionCheck('refgTerm');
let deadline = versionCheck('deadline');
let refgLimit = versionCheck('refgLimit');
let refgCommit = versionCheck('refgCommit');
let serials = config["dbinfo"]["serial-list"];
console.log('  - serial-list:', serials.length);

function versionCheck(prop){
  if(config.dbinfo.hasOwnProperty(prop)){
    console.log('  -', prop, ':', config["dbinfo"][prop]);
    return config["dbinfo"][prop]
  }else {
    console.log('  -', prop, ': NO-DATA');
    return undefined
  }
}

// ################# QUERIES ####################
use(currentSchema);
let log = [];
let affected = 0;
let monitor = new EventEmitter();


function makeTables(year, res) {
  // resumeConnection();
  logRefresh();
  Monitor(monitor, res);

  currentSchema = 'bitsolDB_20' + String(year) + '_test04';
  currentVersion = String(year) + ".0";
  commits = 0;
  serials = [];
  config.dbinfo = {
    "schema": currentSchema,
    "version": currentVersion,
    "commit": commits,
    "date": config.NOW('*'),
    "serial-list": serials
  }
  
  goQuery(`DROP DATABASE IF EXISTS ${currentSchema};`);
  goQuery(`CREATE DATABASE ${currentSchema};`);
  use(currentSchema);

  goQuery('CREATE TABLE `students` (`student_id` INT NOT NULL AUTO_INCREMENT,`serial_number` VARCHAR(20) NOT NULL,`student_name` VARCHAR(15) NOT NULL,`room_name` VARCHAR(6),`gender` CHAR(1) NOT NULL,`term` CHAR(2) NOT NULL,`student_number` VARCHAR(15) NOT NULL, `faculty` VARCHAR(15), `major` VARCHAR(15), `phone` VARCHAR(17),`indate` VARCHAR(10),PRIMARY KEY (`student_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  goQuery('CREATE TABLE `students_log` (`log_id` INT NOT NULL AUTO_INCREMENT,`time` VARCHAR(25) NOT NULL,`target_a` INT NOT NULL,`target_b` INT DEFAULT NULL,`adjustment` VARCHAR(6) NOT NULL,`description` TEXT,`user_id` INT NOT NULL,`user_name` VARCHAR(25) NOT NULL,PRIMARY KEY(`log_id`))ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

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

  goQuery('CREATE TABLE `refg_log` (`log_id` INT NOT NULL AUTO_INCREMENT,`time` VARCHAR(25) NOT NULL,`target` VARCHAR(20) NOT NULL,`month` VARCHAR(5) NOT NULL,`adjustment` CHAR(1) NOT NULL,`amount` INT NOT NULL,`result` INT NOT NULL,`user_id` INT NOT NULL,`user_name` VARCHAR(25) NOT NULL,PRIMARY KEY (`log_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  goQuery('CREATE TABLE `room` (`room_id` INT NOT NULL AUTO_INCREMENT,`room_name` CHAR(6) NOT NULL,`building` CHAR(1) NOT NULL,`floor` CHAR(2) NOT NULL,`room_number` CHAR(2) NOT NULL,`seat` CHAR(1) NOT NULL,`student_id` INT DEFAULT NULL,PRIMARY KEY (`room_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  goQuery('CREATE TABLE `user` (`user_id` INT NOT NULL AUTO_INCREMENT,`user_key` VARCHAR(20) NOT NULL,`user_name` VARCHAR(25) NOT NULL,PRIMARY KEY (`user_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;');

  close();
}

function firstData(worksheet, res){
  // resumeConnection();
  logRefresh();
  Monitor(monitor, res);
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

function updateRefg(student_id, update, res){
  // resumeConnection();
  logRefresh();
  Monitor(monitor, res);
  use(currentSchema);

  updateQuery("refg", "student_id", student_id, refgTerm, update);

  versionUp();
  close();
}

function search(keyword, res){
  const queryID = SearchMonitor(monitor, res);
  let joiResult = searchKeySchema.validate({keyword});
  if(joiResult.error){
    console.log('joiResult.error');
    res.json({
      arg: []
    });
  }else{
    let key = quote(joiResult.value.keyword);
    let query = "SELECT r.room_id, r.room_name, s.student_name, s.term, s.student_number, s.faculty, s.major, s.phone, s.indate, rf.* FROM room r JOIN students s USING (student_id) JOIN refg rf USING (student_id) WHERE ( ";
    query = query.concat("r.room_name REGEXP ", key, " || ");
    query = query.concat("s.student_name REGEXP ", key, ");");
    select(query, queryID);
  }
}

function search_room(keyword, res){
  const queryID = SearchMonitor(monitor, res);
  let joiResult = searchAdminKeySchema.validate({keyword});
  if(joiResult.error){
    console.log('joiResult.error');
    res.json({
      arg: []
    });
  }else{
    let key = quote(joiResult.value.keyword);
    let query = "SELECT r.room_id FROM room r LEFT JOIN students s USING (student_id) WHERE ( ";
    query = query.concat("r.room_name REGEXP ", key, " || ");
    query = query.concat("s.student_name REGEXP ", key, ");");
    select(query, queryID);
  }
}

function search_student(keyword, res){
  const queryID = SearchMonitor(monitor, res);
  let joiResult = searchAdminKeySchema.validate({keyword});
  if(joiResult.error){
    console.log('joiResult.error');
    res.json({
      arg: []
    });
  }else{
    let key = quote(joiResult.value.keyword);
    let query = "SELECT s.student_id FROM students s LEFT JOIN room r USING (student_id) WHERE ( ";
    query = query.concat("r.room_name REGEXP ", key, " || ");
    query = query.concat("s.student_name REGEXP ", key, ");");
    select(query, queryID);
  }
}

function loadStudentList(res){
  const queryID = SearchMonitor(monitor, res);
  let query = "SELECT s.student_id,  s.student_name, r.room_id, r.room_name, r.seat, s.term, s.student_number, s.faculty, s.major, s.phone, s.indate FROM students s LEFT JOIN room r USING (student_id);"
  select(query, queryID);
}

function loadRoomList(res){
  const queryID = SearchMonitor(monitor, res);
  let query = "SELECT r.room_id, r.room_name, r.seat, s.student_id, s.student_name, s.term, s.student_number, s.faculty, s.major, s.phone, s.indate FROM room r LEFT JOIN students s USING (student_id);"
  select(query, queryID);
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
}

function versionUp(){
  commits += 1;
  currentVersion = currentVersion[0] + currentVersion[1] + "." + String(commits);
  config.dbinfo = {
    "schema": currentSchema,
    "version": currentVersion,
    "commit": commits,
    "date": config.NOW('*'),
    "serial-list": serials
  };
}

const searchKeySchema = Joi.object({
  keyword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9가-힣]'))
    .min(2)
    .required()
    .trim(true)
});
const searchAdminKeySchema = Joi.object({
  keyword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9가-힣]'))
    .min(1)
    .required()
    .trim(true)
});



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
  const SCHEMA = backTick(schema);
  let query = `USE ${SCHEMA}`;
  connection.query(query, (error, results, fields) => {
    if(error) {
      monitor.emit('query error', error);
    }
  })
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
function select(query, queryID){
  connection.query(query, (error, results, fields) =>{
    if(error){
      monitor.emit('query error', error);
    }
    monitor.emit(queryID, results);
    console.log('result: ', results.length, ' ... @/mysql.js/select');
    monitor.emit('delete-listener', queryID);
  });
}



// ========================= MONITOR SETTING

function Monitor(monitor, res) {
  monitor.on('query success', (arg) => {
    console.log('$$$ QUERY SUCCESS ... @mysql.js/monitor\n   affected: ', arg.affectedRows);
    affected += arg.affectedRows;
    log.push(arg);
  });
  monitor.on(queryID, (arg) => {
    console.log('$$$ SELECT REQUEST ... @mysql.js/monitor');
    res.json({
      arg
    });
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
    config.update(config.db_root, config.dbinfo);
    console.log("### version updated:", config["dbinfo"]["version"]);
    console.log('### total', serials.length, 'records in students ... @mysql.js');
    // ----------- update log file
    // ~~~~~~~~~
  });
}

function SearchMonitor(monitor, res) {
  const queryID = randomstring.generate(4);
  monitor.on(queryID, (arg) => {
    res.json({arg});
    console.log('responsed... queryID: ', queryID);
  });
  return queryID
}

monitor.on('query error', (arg) => {
  console.log('$$$ QUERY ERROR ... @mysql.js/monitor');
  console.log(arg);
});

monitor.on('delete-listener', (name) => {
  monitor.removeAllListeners(name);
});



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
    } console.log('$$$ CONNECTED: ' + connection.threadId + '  ... @mysql.js/connection\n===========================================\n===========================================\n\n');
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

module.exports.use = use;
module.exports.makeTables = makeTables;
module.exports.firstData = firstData;

module.exports.search = search;
module.exports.search_room = search_room;
module.exports.search_student = search_student;
module.exports.loadStudentList = loadStudentList;
module.exports.updateRefg = updateRefg;

module.exports.loadRoomList = loadRoomList;

module.exports.monitor = monitor;

// pauseConnection();
// reConnect();