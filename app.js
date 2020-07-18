const express = require('express');
const path = require('path');
const fs = require('path');
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

app.post('/api/worksheet', (req, res) => {
    const data = req.body;
    console.log("--- REQUEST DETECTED ---");
    console.log("data type: " + typeof(data));
    console.log(data);
    res.json(data);
});

app.post('/api/db/init', (req, res) => {
    const year = req.body.givenYear;
    console.log(req.body);
    console.log(year);
    mysql.initDB(year, res);
});






const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));