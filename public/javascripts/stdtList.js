const stdtList = document.getElementById("stdtList"); // master
let midCell = document.getElementById("midCell"); // refreshing
let keyword, resultArr; // SEARCH RESULTS

const author = "gunn"
let refgTerm = '19_1';

let displayScope = 0
function selectDS(arg){
  displayScope = arg;
  console.log("displayScope:");
  console.log(arg);
}




// ################################# SEARCH API

let displayContent = "나중에는 필요 없을듯";
noResult("검색결과가 없습니다...\n 호실번호 또는 이름으로 검색");

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
    noResult("검색결과가 없습니다...\n 호실번호 또는 이름으로 검색");
  }

  for(i=0; i < resultArr.length; i++){
    resultArr[i].update = resultArr[i][refgTerm];
    displayContent = "room: " + resultArr[i].room_name + "\n" + "name:" + resultArr[i].student_name + " refg:" + resultArr[i][refgTerm] + "  ";
    displayResult(i);
  }
}

function refreshNode(parent, child, id){
  parent.removeChild(child);
  var remake = document.createElement('div');
  remake.setAttribute('id', id);
  parent.appendChild(remake);
  return document.getElementById(id);
}
function noResult(content){
  var child = document.createElement("p");
  child.setAttribute('id', 'no_result');
  child.appendChild(document.createTextNode(content));
  midCell.appendChild(child);
}



function displayResult(i){ // i is from resultArr(i)
  var child = document.createElement("div");
  child.setAttribute('class', 'units');
  child.appendChild(makeResultForm(i));
  midCell.appendChild(child);
}

function makeResultForm(i){
  let btn, text;
  let result = document.createElement("div");
  result.setAttribute('id', "result"+String(i));

  // ~~~~~~~~~ 검색결과, string
  result.appendChild(document.createTextNode(displayContent));

  // ~~~~~~~~~ (-) 버튼
  btn = document.createElement('button');
  btn.onclick =function(){adjustBtn("-", i);};
    text = document.createTextNode('-');
      btn.appendChild(text);
  result.appendChild(btn);

  // ~~~~~~~~~ (+) 버튼
  btn = document.createElement('button');
    btn.onclick =function(){adjustBtn("+", i);};
    text = document.createTextNode('+');
      btn.appendChild(text);
  result.appendChild(btn);

  // ~~~~~~~~~ (확인) 버튼
  btn = document.createElement('button');
    btn.onclick =function(){refgUpdate(i)};
    text = document.createTextNode('submit');
      btn.appendChild(text);
  result.appendChild(btn);

  return result
}

function adjustBtn(arg, i){
  if(arg === "+"){
    resultArr[i].update += 1;
  }else {
    resultArr[i].update -= 1;
  }
  if(resultArr[i].update > 2){
    console.log("bigger than 2");
    resultArr[i].update = 2;
  }else if(resultArr[i].update < 0) {
    console.log("less than 0");
    resultArr[i].update = 0;
  }
  console.log('amount: ' + resultArr[i].update);
}









// ################################# DB UPDATE API



async function refgUpdate(i) {
  console.log('f: refgUpdate');
  var package = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      student_id: resultArr[i].student_id, // int
      refgTerm, // like "20_7"
      update: resultArr[i].update // int
    })
  };
  var request = await fetch('/api/db/update/refg', package);
  var response = await request.json();
  console.log(response);
}