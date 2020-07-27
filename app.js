const express = require('express');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const mysql = require('./data/mysql');

const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json({
    limit: "50mb"
}));
app.use(express.text({
    defaultCharset:"utf-8",
    limit: "50mb"
}));

const urls = {
    refg: path.join(__dirname,'/html/refg.html'),
    dbtest: path.join(__dirname, '/html/dbTest.html')
}; app.get('/api/refg', (req,res) =>{
    res.sendFile(urls.refg);    
});app.get('/api/dbtest', (req,res) =>{
    res.sendFile(urls.dbtest);    
});



app.post('/apitest', (req, res) => {
    const data  = req.body;
    console.log(data);
    res.json({
        status: 'success',
        account: data.account,
        timeCode: data.timeCode,
        keyword: data.keyword
    })
});


// ###################### DATABASE API #################

var worksheet;
app.post('/api/db/worksheet', (req, res) => {
    worksheet = req.body;
    console.log(worksheet);
    console.log('###### WORKSHEET RECIEVED: total', worksheet.length, 'raws');
    res.json({
        "status": 200,
        "data": worksheet
    });
});

app.post('/api/db/init', (req, res) => {
    const year = req.body.givenYear;
    console.log("givenYear:", year, " ... @api/db/init");
    mysql.makeTables(year, res);
});

app.post('/api/db/init/dataforming', (req, res) => {
    console.log("initial data request ... @api/db/init/dataforming");
    mysql.firstData(worksheet, res);
});


var searchKey;
var refgTerm, adjust, amount;

var student_id = 726;

app.post('/api/db/update/refg', (req, res) => {
    console.log("update request for refg ... @api/db/update/refg");
    console.log(req.body);

    refgTerm = req.body.refgTerm;
    adjust = req.body.adjust;
    amount = req.body.amount;

    mysql.updateRefg(student_id, refgTerm, amount, adjust, res);
});

app.post('/api/db/search', (req, res) => {
    console.log("search request for refg ... @api/db/search");
    searchKey = req.body.searchKey;

    mysql.searchRefgData(searchKey, res)
})









const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`### Listening on port ${port} ... @app.js \n\n\n\n`));