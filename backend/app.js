const express = require('express');
const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

    // CUSTOM MODULES
const mysql = require('./api/mysql');
const version = require('./api/config');
const auth = require('./api/auth');

    // ROUTES
const studentsRouter = require('./routes/students');

    // APP SETTING
const app = express();
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json({
    limit: "50mb"
}));
app.use(express.text({
    defaultCharset:"utf-8",
    limit: "50mb"
}));





// app.use('/api/students', studentsRouter);












// USER CONFIG
let user = version.readSync(path.join(__dirname, './data/users.json'));  //users.json
console.log('AUTHORIZED USERS: ', user);

app.post('/auth/login', async (req, res) => {
    let accessToken;
    const {key, expiresIn} = req.body;
    if(user.hasOwnProperty(key)) {
        console.log("### userID confirmed .../api/login");
        accessToken = auth.signToken(user[key]["id"], user[key]["access-level"], expiresIn);
        res.json({accessToken});
    }else {
        console.log("### no userID .../api/login");
        return res.status(401).json({error: 'Login failure'})
    }
})

app.get('/auth/verify', (req, res) => {
    let accessToken;
    console.log(req.headers);
    if(req.headers.authorization) {
        accessToken = req.headers.authorization
        console.log("...got headers.authorization");
        auth.verify(accessToken)


        res.json({
            "authorized" : 1,
            "msg": "Authorization Complete (200)"
        });
    }else {
        res.json({
            "authorized": 0,
            "msg": "Authorization Failed err(401)"
        })
    }
})












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


let searchKey;
let student_id, refgTerm, update;

app.post('/api/db/update/refg', (req, res) => {
    console.log("update request for refg ... @api/db/update/refg");
    console.log(req.body);

    student_id = req.body.student_id;
    refgTerm = req.body.refgTerm;
    update = req.body.update;

    mysql.updateRefg(student_id, refgTerm, update, res);
});

app.post('/api/db/search', (req, res) => {
    console.log("search request for refg ... @api/db/search");
    searchKey = req.body.keyword;

    mysql.searchStudent(searchKey, res);
})









const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`### Listening on port ${port} ... @app.js \n\n\n\n`));