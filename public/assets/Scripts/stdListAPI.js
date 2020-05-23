// input refresh method
async function roomNumSearch() {
  console.log('f: roomNumSearch');
  var roomList = document.getElementById("roomList");
  var room;

  room = document.getElementById("roomNum").value;
  console.log(room);

  var newCell = document.createElement("p");
  var text = document.createTextNode(room);
  newCell.appendChild(text);
  roomList.appendChild(newCell);
  // Making new html elements when roomNum input changed simultaneously




  // 서버에서 데이터를 가져오면
  // 그 데이터를 표시해야함
  // 색인된 호실 갯수만큼 리스트 박스를 생성하고, 동시에 각각의 박스에 내용을 채워넣는다
}