// input refresh & search method
var keyword, searchPack, searchReq, searchRes;
var resultArr = []; var resultContent;
var room_id, room_name, student_name, term, student_number, faculty, major, phone, indate, student_id;

const stdtList = document.getElementById("stdtList");
var midCell = document.getElementById("midCell");
var newCell, resultBox;

let refgTerm = '19_1';
const account = "gunn"

displayResult(midCell, newCell, "search manual here...");

keyword = "101";
async function searchStudent() {
  console.log('### SEARCH REQUEST ... @stdtList/searchStudent');
  keyword = document.getElementById("keyword").value;
  var searchPack = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ keyword })
  };
  searchReq = await fetch('/api/db/search', searchPack);
  searchRes = await searchReq.json(); // {arg: Array(n)}
  resultArr = searchRes.arg
  
  refreshNode(stdtList, midCell, "midCell");
  midCell = document.getElementById("midCell");

  for(i=0; i < resultArr.length; i++){
    room_name = resultArr[i].room_name;
    student_name = resultArr[i].student_name;
    resultContent = "room: " + room_name + "\n" + "name:" + student_name;
    displayResult(midCell, newCell, resultContent);
  }
}
function displayResult(parent, child, content){
  child = document.createElement("p");
  child.setAttribute('id', 'resultBox');
  child.appendChild(document.createTextNode(content));
  parent.appendChild(child);
  resultBox = document.getElementById("resultBox");
  console.log(" ------ f: displayResult");
}
function refreshNode(parent, child, id){
  parent.removeChild(child);
  var remake = document.createElement('div');
  remake.setAttribute('id', id);
  parent.appendChild(remake);
  // child = document.getElementById(id);
}










// key settings
let adjust = "+";
let amount = 2;

async function refgUpdate() {
  console.log('f: refgUpdate');
  var package = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      refgTerm,
      adjust,
      amount
    })
  };
  var request = await fetch('/api/db/update/refg', package);
  var response = await request.json();
  console.log(response);
}