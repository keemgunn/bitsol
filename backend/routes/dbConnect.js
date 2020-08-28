const path = require('path');
const express = require('express');
const router = express.Router();

const mysql = require('../api/mysql');
const version = require('../api/config');




// ============== DATABASE CONFIGURATIONS
const dbconfig_root = path.join(__dirname, '../data/db.json');
const info = version.readSync(dbconfig_root);

router.get('/info', (req, res) => {
  console.log("data request ... /db/info");
  res.json({
    "schema": info.schema,
    "build": info.build,
    "commit": info.commit,
    "date": info.date,
    "refgTerm": info.refgTerm,
    "deadline": info.deadline,
    "refgLimit": info.refgLimit,
    "studentCount": info["serial-list"].length
  })
})

router.get('/info/commit', (req, res) => {
  info.commit = info.commit + 1 ;
  version.update(dbconfig_root, info);
  res.json({ "commit": info.commit });
})



// ================== INITIATING DATABASE
let worksheet;

router.post('/worksheet', (req, res) => {
    worksheet = req.body;
    console.log(worksheet);
    console.log('###### WORKSHEET RECIEVED: total', worksheet.length, 'raws');
    res.json({
        "status": 200,
        "data": worksheet
    });
});

router.post('/init', (req, res) => {
    const year = req.body.givenYear;
    console.log("givenYear:", year, " ... /db/init");
    mysql.makeTables(year, res);
});

router.post('/init/dataforming', (req, res) => {
    console.log("initial data request ... /db/init/dataforming");
    mysql.firstData(worksheet, res);
});



// ================== LOAD DATABASE

router.get('/room-list', (req, res) => {
  console.log("data request ... /db/room-list");
  mysql.loadRoomList(res);
})

router.get('/student-list', (req, res) => {
  console.log("data request ... /db/student-list");
  mysql.loadStudentList(res);
})



// ============= SEARCH API
let searchKey;

router.post('/search', (req, res) => {
  searchKey = req.body.keyword;
  console.log("search request keyword: ", searchKey, " .../db/search");
  mysql.searchStudent(searchKey, res);
})



// ============= UPDATE REFG DATA
let student_id, refgTerm, update;

router.post('/update/refg', (req, res) => {
  console.log("update request for refg ... @api/db/update/refg");
  console.log(req.body);

  student_id = req.body.student_id;
  refgTerm = req.body.refgTerm;
  update = req.body.update;

  mysql.updateRefg(student_id, refgTerm, update, res);
});


// ============= ADMIN METHODS
















module.exports = router;