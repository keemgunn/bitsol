const path = require('path');
const express = require('express');
const router = express.Router();

const mysql = require('../api/mysql');
const version = require('../api/config');
const { EWOULDBLOCK } = require('constants');

// from XLSX module
var worksheet;



// LOAD DB INFO
router.get('/info', (req, res) => {
  const info = mysql.dbInfo();
  res.json({
    "schema": info.schema,
    "build": info.build,
    "date": info.date,
    "refgTerm": info.refgTerm,
    "studentCount": info["serial-list"].length
  })
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



















module.exports = router;