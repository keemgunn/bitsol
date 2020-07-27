const stdtList = document.getElementById("stdtList"); // master
let midCell = document.getElementById("midCell"); // refreshing
let resultArr; // SEARCH RESULTS

const author = "gunn"

let refgTerm = '19_1';
let keyword = "101";
let adjust = "+";
let amount = 0;

let displayScope = 0
function selectDS(arg){
  displayScope = arg;
  console.log("displayScope:");
  console.log(arg);
}




// ################################# SEARCH API

let displayContent = "호실번호 또는 이름으로 검색";
noResult(midCell, displayContent);

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
    noResult(midCell, displayContent);
  }

  for(i=0; i < resultArr.length; i++){
    displayContent = "room: " + resultArr[i].room_name + "\n" + "name:" + resultArr[i].student_name + " refg:" + resultArr[i]["19_1"] + "  ";
    displayResult(midCell, i, displayContent);
  }
}

function refreshNode(parent, child, id){
  parent.removeChild(child);
  var remake = document.createElement('div');
  remake.setAttribute('id', id);
  parent.appendChild(remake);
  return document.getElementById(id);
}
function noResult(parent, content){
  var child = document.createElement("p");
  child.setAttribute('id', 'no_result');
  child.appendChild(document.createTextNode(content));
  parent.appendChild(child);
}



function displayResult(parent, resultNum, content){
  var child = document.createElement("div");
  child.setAttribute('class', 'units');
  child.appendChild(makeResultForm(resultNum, content));
  parent.appendChild(child);
}

function makeResultForm(resultNum, content){
  let btn, text;
  let result = document.createElement("div");
  result.setAttribute('id', "result"+String(resultNum));

  // ~~~~~~~~~ 검색결과, string
  result.appendChild(document.createTextNode(content));

  // ~~~~~~~~~ (-) 버튼
  btn = document.createElement('button');
  btn.onclick =function(){adjustBtn("-");};
    text = document.createTextNode('-');
      btn.appendChild(text);
  result.appendChild(btn);

  // ~~~~~~~~~ (+) 버튼
  btn = document.createElement('button');
    btn.onclick =function(){adjustBtn("+");};
    text = document.createTextNode('+');
      btn.appendChild(text);
  result.appendChild(btn);

  // ~~~~~~~~~ (확인) 버튼
  btn = document.createElement('button');
  // btn.setAttribute('onclick', refgUpdate());
  text = document.createTextNode('submit');
    btn.appendChild(text);
  result.appendChild(btn);

  return result
}

function adjustBtn(arg, resultNum){
  adjust = arg;
  if(arg === "+"){
    amount += 1;
  }else {
    amount -= 1;
  }
  if(amount > 2){
    console.log("amount is bigger than 2");
    amount = 2;
  }else if(amount < 0) {
    console.log("amount is less than 0");
    amount = 0;
  }
  console.log('amount: ' + amount);
}









// ################################# DB UPDATE API



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