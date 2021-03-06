const path = require('path');
const express = require('express');
const router = express.Router();

const mysql = require('../api/mysql');
const config = require('../api/config');


// ============== DATABASE CONFIGURATIONS

router.get('/info', (req, res) => {
  console.log("data request ... /db/info");
  res.json(config.dbinfo);
})

router.get('/version-info', (req, res) => {
  console.log("data request ... /db/version-info");
  res.json(config.version);
})

router.get('/user-info', (req, res) => {
  console.log("data request ... /db/user-info");
  res.json(config.user);
})

router.get('/info/commit', (req, res) => {
  config.dbinfo.commit = config.dbinfo.commit + 1 ;
  config.update(config.db_root, config.dbinfo);
  res.json({ "commit": config.dbinfo.commit });
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
router.post('/search', (req, res) => {
  console.log("\n\n\nsearch request keyword: ", req.body.keyword, " .../db/search");
  console.log("account:", req.body.account);
  mysql.search(req.body.keyword, res);
})
router.post('/search/room', (req, res) => {
  console.log("\n\n\nsearch request keyword: ", req.body.keyword, " .../db/search/room");
  console.log("account:", req.body.account);
  mysql.search_room(req.body.keyword, res);
})
router.post('/search/student', (req, res) => {
  console.log("\n\n\nsearch request keyword: ", req.body.keyword, " .../db/search/student");
  console.log("account:", req.body.account);
  mysql.search_student(req.body.keyword, res);
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