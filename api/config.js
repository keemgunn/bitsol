const fs = require('fs');


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


module.exports.read = read;
module.exports.readSync = readSync;
module.exports.write = write;
module.exports.update = update;