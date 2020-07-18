const fileDrop = document.getElementById("diveBox");
var worksheet;

// -------------- CHOOSE FILE
function excelExport(event){
  var input = event.target;
  var reader = new FileReader();
  reader.onload = function(){
      var fileData = reader.result;
      var wb = XLSX.read(fileData, {type : 'binary'});
      wb.SheetNames.forEach(function(sheetName){
        worksheet =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        console.log(JSON.stringify(worksheet));
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
  reader.onload = function(event) {
    var data = new Uint8Array(event.target.result);
    var wb = XLSX.read(data, {type: 'array'});
    wb.SheetNames.forEach(function(sheetName){
      worksheet =XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      console.log(JSON.stringify(worksheet));
      sendtoServer(worksheet);
    })
  }; reader.readAsArrayBuffer(f);
}function excelExportOverHandler(event) {
  console.log('File(s) in drop zone'); 
  event.preventDefault();
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
  console.log(confirmation[0]);
  console.log(typeof(confirmation));
}