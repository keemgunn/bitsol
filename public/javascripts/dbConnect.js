let givenYear = document.getElementById("year").value;
var worksheet; // XLSX data in array form
let dataCheck = 0, infoCheck = 0; // trigger condition


// ========================== XLSX data parsing

// -------------- CHOOSE FILE
function excelExport(event){
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
    dataCheck = 1; // when loaded
    var fileData = reader.result;
    var wb = XLSX.read(fileData, {type : 'binary'});
    wb.SheetNames.forEach(function(sheetName){
      worksheet =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      // console.log(JSON.stringify(worksheet));

      displayInfo(worksheet);
      sendtoServer(worksheet); 
    })
  }; reader.readAsBinaryString(input.files[0]);
}

// -------------- DRAG AND DROP
function excelExportDrop(event) {
  event.stopPropagation(); event.preventDefault();
  var files = event.dataTransfer.files;
  var f = files[0];
  var reader = new FileReader();
  reader.onload = (event) => {
    dataCheck = 1; // when loaded
    var data = new Uint8Array(event.target.result);
    var wb = XLSX.read(data, {type: 'array'});
    wb.SheetNames.forEach((sheetName) => {
      worksheet =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      // console.log(JSON.stringify(worksheet));

      displayInfo(worksheet);
      sendtoServer(worksheet);
    })
  }; reader.readAsArrayBuffer(f);
}function excelExportOverHandler(event) {
  console.log('File(s) in drop zone'); 
  event.preventDefault();
}

// -------------- DISPLAY DATA INFO
function displayInfo(worksheet){
  console.log('++++ File Dropped ++++');
  console.log('row :', worksheet.length);
}

// -------------- FETCH API
async function sendtoServer(content){
  const package = { 
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(content)
  };
  const sendPackage = await fetch('/api/worksheet', package);
  const confirmation = await sendPackage.json();
  console.log(confirmation);
}




// ========================== initiating db

// -------------- CHECK
function dbTrigger() {
  const trigger = infoCheck * dataCheck ;
  if (trigger === 1) {
    initDB();
  } else {
    if (infoCheck === 0) {
      // DOM alert
      console.log("require: infoCheck");
    } else {
      // DOM alert
      console.log("require: dataCheck");
    }
  }
}

// -------------- INITIATING DATABASE
async function initDB() {
  console.log('f: initDB');
  var package = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "givenYear": givenYear
    })};
  var dbAction = await fetch('/api/db/init', package);
  var response = await dbAction.json();
  console.log(response);
}


async function test00() {
  console.log('f: test00');
  var package = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "givenYear": givenYear
    })};
  var dbAction = await fetch('/api/db/init/test00', package);
  var response = await dbAction.json();
  console.log(response);
}









function yearSet() {
  givenYear = document.getElementById("year").value;
  if (givenYear === 'none') {
    infoCheck = 0; // when entered
    console.log("no selection");
    // DOM error alart 
  } else {
    infoCheck = 1; // when entered
    console.log(givenYear);
  }
}