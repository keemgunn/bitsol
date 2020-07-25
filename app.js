const express = require('express');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const mysql = require('./data/mysql');


const app = express();
app.use(express.json({
    limit: "50mb"
}));
app.use(express.text({
    defaultCharset:"utf-8",
    limit: "50mb"
}));
app.use(express.static(path.join(__dirname,'public')));

const urls = {
    refg: path.join(__dirname,'/html/refg.html'),
    dbtest: path.join(__dirname, '/html/dbTest.html')
};
app.get('/api/refg', (req,res) =>{
    res.sendFile(urls.refg);    
});
app.get('/api/dbtest', (req,res) =>{
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


var worksheet;
app.post('/api/worksheet', (req, res) => {
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





app.post('/api/db/init/test00', (req, res) => {


    mysql.firstData(worksheet, res);
});











const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`### Listening on port ${port} ... @app.js \n\n\n\n`));