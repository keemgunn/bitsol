var express = require('express');
var app = express();

app.listen(3000, () => console.log("Server is running in port 3000")); // callback function

app.use(express.static('public'));

app.post('/apiTest', (request, response) => {
    console.log(request);
});