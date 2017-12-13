const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('../config');
const connection = require('../components/kolonialapi/connection');


let search = "sjokolade";
let list;



/* GET home page. */
router.get('/', function(req, res, next) {

  let search = "ost";

  connection.kolonialSearch(search, function(list){

  res.render('index', {
    title: 'K-Planleggeren',
    search: search,
    data: list });
  });

});

module.exports = router;
