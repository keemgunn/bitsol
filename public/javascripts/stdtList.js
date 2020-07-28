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
  var unit = document.createElement("div");
  unit.setAttribute('class', "unit" + resultArr[i].building + resultArr[i].seat);

  unit.appendChild(RefgName());
  unit.appendChild(RefgPack(i));
  unit.appendChild(RefgBtn(i));
  unit.appendChild(RefgSubmit(i));

  midCell.appendChild(unit);
}

function RefgName(){
  let results = document.createElement("div");
  results.setAttribute('class', 'refgName');
  results.appendChild(document.createTextNode(displayContent))

  return results
}

function RefgPack(i) {
  let results = document.createElement("div");
  results.setAttribute('class', 'refgPack');
  let cast0, cast1;

  cast0 = document.createElement('div'); // "pack[i]0"
  cast0.setAttribute('id', "pack" + String(i) + "0");
  
  cast1 = document.createElement('div'); // "pack[i]1"
  cast1.setAttribute('id', "pack" + String(i) + "1");
  
  if(resultArr[i][refgTerm] == 0){
    cast0.appendChild(attatch_pack(1));
    cast1.appendChild(attatch_pack(1));
  }else if(resultArr[i][refgTerm] == 1){
    cast0.appendChild(attatch_pack(1));
    cast1.appendChild(attatch_pack(0));
  }else{
    cast0.appendChild(attatch_pack(0));
    cast1.appendChild(attatch_pack(0));
  }
  
  results.appendChild(cast0); // "pack[i]0"
  results.appendChild(cast1); // "pack[i]1"

  return results
}
function attatch_pack(type){
  let src = "/../images/refgPack_" + String(type) + ".png";
  let results = document.createElement("img");
  results.setAttribute('src', src);
  return results
}




function refresh_pack(i, num){

  return results
}




function RefgBtn(i) {
  let results = document.createElement("div");
  results.setAttribute('class', 'refgBtn');
  let cast, text;

  cast = document.createElement('button'); 
  cast.onclick =function(){adjustBtn("-", i);};
  text = document.createTextNode('-');
  cast.appendChild(text);
  results.appendChild(cast); // (-) 버튼

  cast = document.createElement('button');
  cast.onclick =function(){adjustBtn("+", i);};
  text = document.createTextNode('+');
  cast.appendChild(text);
  results.appendChild(cast); // (+) 버튼

  return results
}

function RefgSubmit(i) {
  let results = document.createElement("div");
  results.setAttribute('class', 'refgSubmit');
  let cast, text;

  cast = document.createElement('button'); 
  cast.onclick =function(){refgUpdate(i);};
  text = document.createTextNode('submit');
  cast.appendChild(text);
  results.appendChild(cast);

  return results
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
  console.log('update: ' + resultArr[i].update);
}

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