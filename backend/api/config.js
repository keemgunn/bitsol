const path = require('path');
const fs = require('fs');


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
  let result;
  if(format === '*'){
    result = t.getFullYear() + '.' + t.getMonth() + '.' + t.getDate() + '-' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
  }else if(format === 'YMD'){
    result = t.getUTCFullYear() + '.' + t.getUTCMonth() + '.' + t.getUTCDate();
  }else if(format === 'unix'){
    result = t.getTime();
  }else if(format == 'raw'){
    result = t;
  }
  return result
}



// =========================== FILE METHODS

function read(file){
  let parsed
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    parsed = JSON.parse(data);
    console.log("--- read data ... @config.js/read \n", parsed);
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
  console.log('--- Data updated: \n', file, ' ... @config.js/update');
}



// =========================== VERSION CONTROL

require('child_process').exec('git rev-parse HEAD', function(err, stdout) {
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
    version.version = vers[0] + vers[1] + commit;
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