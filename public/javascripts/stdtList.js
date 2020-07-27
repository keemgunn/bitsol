const stdtList = document.getElementById("stdtList"); // master
let midCell = document.getElementById("midCell"); // refreshing
let resultArr; // SEARCH RESULTS

const author = "gunn"


let displayScope = 0
function selectDS(arg){
  displayScope = arg;
  console.log("displayScope:");
  console.log(arg);
}




// ################################# SEARCH API

let displayContent = "호실번호 또는 이름으로 검색";
displayResult(midCell, "no-result", displayContent);

async function searchStudent() {
  console.log('### SEARCH REQUEST ... @stdtList/searchStudent');
  keyword = document.getElementById("keyword").value;
  var package = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ keyword })
  };
  var request = await fetch('/api/db/search', package);
  var response = await request.json(); // {arg: Array(n)}
  resultArr = response.arg;

  midCell = refreshNode(stdtList, midCell, "midCell");

  console.log(resultArr.length + " results"); // results callback

  if(resultArr.length == 0){
    displayContent = "검색결과가 없습니다...\n 호실번호 또는 이름으로 검색";
    displayResult(midCell, "no-result", displayContent);
  }

  for(i=0; i < resultArr.length; i++){
    displayContent = "room: " + resultArr[i].room_name + "\n" + "name:" + resultArr[i].student_name;
    displayResult(midCell, "result"+String(i), displayContent);
  }
}

function displayResult(parent, id, content){
  var child = document.createElement("p");
  child.setAttribute('id', id);
  child.appendChild(document.createTextNode(content));
  parent.appendChild(child);
}

function refreshNode(parent, child, id){
  parent.removeChild(child);
  var remake = document.createElement('div');
  remake.setAttribute('id', id);
  parent.appendChild(remake);
  return document.getElementById(id);
}



// ################################# DB UPDATE API

let refgTerm = '19_1';
let keyword = "101";
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