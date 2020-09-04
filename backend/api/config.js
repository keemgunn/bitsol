const path = require('path');
const fs = require('fs');
const { func } = require('joi');


// =========================== CONFIGS

const db_root = path.join(__dirname, '../data/db.json');
let dbinfo = readSync(db_root);

const version_root = path.join(__dirname, '../data/version.json');
let version = readSync(version_root);

const version_log_root = path.join(__dirname, '../data/version_log.json');

const user_root = path.join(__dirname, '../data/users.json');
let user = readSync(user_root);  

const access_log_root = path.join(__dirname, '../data/access_log.json');
let access_log = readSync(access_log_root);



// =========================== CONFIG METHODS

function NOW(format) {
  let t = new Date();
  str = function(input) {
    console.log(input);
    if(input < 10){
      return "0" + (input).toString()
    }else{
      return (input).toString()
    }
  }
  if(format === '*'){
    return t.getFullYear() + '.' + str(t.getMonth()+1) + '.' + str(t.getDate()) + '-' + str(t.getHours()) + ':' + str(t.getMinutes()) + ':' + str(t.getSeconds());
  }else if(format === 'YMD'){
    return t.getUTCFullYear() + '.' + str(t.getMonth()+1) + '.' + str(t.getDate());
  }else if(format === 'unix'){
    return t.getTime();
  }else if(format == 'raw'){
    return t;
  }
}



// =========================== FILE METHODS

function read(file){
  let parsed
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    parsed = JSON.parse(data);
  });
  return parsed
}
function readSync(file){
  let rawdata = fs.readFileSync(file);
  let parsed = JSON.parse(rawdata);
  return parsed
}
function write(data, file){
  let writable = JSON.stringify(data, null, 2);
  fs.writeFile(file, writable, (err) => {
    if (err) throw err;
    console.log('--- Data written to file: \n', file, ' ... @config.js/write');
  });
}
function writeSync(data, file){
  let writable = JSON.stringify(data, null, 2);
  fs.writeFileSync(file, writable);
}
function update(file, source){
  let target = readSync(file);
  Object.assign(target, source);
  writeSync(target, file);
  console.log('   ... Data updated');
}



// =========================== VERSION CONTROL

require('child_process').exec('git rev-parse HEAD', function(err, stdout) {
  stdout = stdout.slice(0,stdout.length-1);
  console.log(stdout);
  if(version.build !== stdout){
    let version_log = readSync(version_log_root);
    let oldVer = {
      version: version.version,
      build: version.build,
      date: version.date
    }
    version_log.unshift(oldVer);
    update(version_log_root, version_log);

    let vers = version.version.split('.');
    let commit = parseInt(vers[2]) + 1;
    version.version = vers[0] + '.' + vers[1] + '.' + commit;
    version.build = stdout;
    version.date = NOW('YMD');
    version['server-on'] = NOW('*');
    update(version_root, version);
    console.log('VERSION (updated)=========================\n', version);
  }else{
    version['server-on'] = NOW('*');
    update(version_root, version);
    console.log('VERSION ==================================\n', version);
  }
});



// =========================== EXPORTS

module.exports.db_root = db_root;
module.exports.version_root = version_root;
module.exports.user_root = user_root;
module.exports.access_log_root = access_log_root;

module.exports.dbinfo = dbinfo;
module.exports.version = version;
module.exports.user = user;
module.exports.access_log = access_log;

module.exports.NOW = NOW;

module.exports.read = read;
module.exports.readSync = readSync;
module.exports.write = write;
module.exports.update = update;