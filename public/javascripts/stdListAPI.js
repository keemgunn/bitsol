// input refresh method

var roomList = document.getElementById("roomList");
var timeCode;
var keyword, keywordPack, keyReq, gotResponse;
const account = "gunn"

async function roomNumSearch() {
  console.log('f: roomNumSearch');
  timeCode = new Date();

  keyword = document.getElementById("roomNum").value;
  console.log(keyword);

  keywordPack = {
    method: 'POST',
    headers: {"Content-Type": "application/json"}, // more info: search about HTTP header...
    body: JSON.stringify({account,timeCode,keyword})
  };
  keyReq = await fetch('/apiTest', keywordPack);

  gotResponse = await keyReq.json();
  console.log(gotResponse);  
  // input 창 텍스트파일 JSON화 시켜서 보낸 다음에
  // 받은거 확인하고 콘솔창에 로그 하고
  // 데이터 그대로 다시 리패키징 해서 받아오기





  var newCell = document.createElement("p");
  var text = document.createTextNode(keyword);
  newCell.appendChild(text);
  roomList.appendChild(newCell);
  // Making new html elements when roomNum input changed simultaneously




  // 서버에서 데이터를 가져오면
  // 그 데이터를 표시해야함
  // 색인된 호실 갯수만큼 리스트 박스를 생성하고, 동시에 각각의 박스에 내용을 채워넣는다
}