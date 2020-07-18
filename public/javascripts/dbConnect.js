async function initDB() {
  console.log('f: initDB');

  const givenYear = 18;

  var package = {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      "givenYear": givenYear
    })
  };
  var dbAction = await fetch('/api/db/init', package);

}