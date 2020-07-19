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


var worksheet;
app.post('/api/worksheet', (req, res) => {
    worksheet = req.body;
    console.log(worksheet);
    console.log('###### WROKSHEET RECIEVED: total', worksheet.length, 'raws');

    var replyPackage = {
        "status": 'success',
        "data": worksheet
    }; res.json(replyPackage);
});
app.post('/api/db/init', (req, res) => {
    const year = req.body.givenYear;
    const data = req.body.data;
    // console.log(req.body);
    console.log(year);
    mysql.initDB(year, res);



    var test = {
        status: 'fuck you'
    }

    // mysql.monitor.on('function complete', (arg) => {
    //     console.log('---- FUNCTION COMPLETE ----');
    //     res.json(test);
    // })

    res.json(test)



});






const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on port ${port}...`));