const path = require('path');
const express = require('express');
const router = express.Router();

const mysql = require('../api/mysql');
const version = require('../api/config');

// from XLSX module
var worksheet;



// ============== DATABASE CONFIGURATIONS
const dbconfig_root = path.join(__dirname, '../data/db.json');
const info = version.readSync(dbconfig_root);

router.get('/info', (req, res) => {
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




// ============= load from .xlsx

router.post('/worksheet', (req, res) => {
    worksheet = req.body;
    console.log(worksheet);
    console.log('###### WORKSHEET RECIEVED: total', worksheet.length, 'raws');
    res.json({
        "status": 200,
        "data": worksheet
    });
});



// ============= INITIATING DATABASE

router.post('/init', (req, res) => {
    const year = req.body.givenYear;
    console.log("givenYear:", year, " ... @api/db/init");
    mysql.makeTables(year, res);
});

router.post('/init/dataforming', (req, res) => {
    console.log("initial data request ... @api/db/init/dataforming");
    mysql.firstData(worksheet, res);
});



// ============= SEARCH API

router.get('/student-list', (req, res) => {
  console.log("data request for user ... @api/db/student-list");
  mysql.loadRoomList(res);
})






let searchKey;
let student_id, refgTerm, update;
router.post('/search', (req, res) => {
    console.log("search request for refg .../db/search");
    searchKey = req.body.keyword;
    mysql.searchStudent(searchKey, res);
})



// ============= UPDATE REFG DATA

router.post('/update/refg', (req, res) => {
  console.log("update request for refg ... @api/db/update/refg");
  console.log(req.body);

  student_id = req.body.student_id;
  refgTerm = req.body.refgTerm;
  update = req.body.update;

  mysql.updateRefg(student_id, refgTerm, update, res);
});


// ============= ADMIN METHODS

router.get('/admin/all-room', (req, res) => {
  console.log("data request for admin ... @api/db/admin/all-room");
  mysql.loadRoomList(res);
})














module.exports = router;