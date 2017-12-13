const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('../config');
//const connection = require('../components/kolonialapi/connection');
var jsonResponse = require('../components/kolonialapi/connection').jsonResponse;

//let list;

let search = "sjokolade";
let list;


//Parameters for API search.

let options = {
  host: 'kolonial.no',
  port: 443,
  path: '/api/v1/search/?q=' + search,
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "User-Agent": config.secretusername,
      "X-Client-Token": config.secrettoken
    }
};



/*


  API request to kolonial.no
  This should be a module

*/

const req = https.request(options, (res) => {
  //console.log('statusCode:', res.statusCode);
  //console.log('headers:', res.headers);

  let chunks = [];

// Datachunks sent back is incrementally pushed into an array.
  res.on('data', (d) => {
    chunks.push(d);
  });

// Piece together chunks in array and parse.
  res.on('end', () => {
    let data = Buffer.concat(chunks);
    list = JSON.parse(data);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();

// API request to kolonial.no ends here.

//let list = connection.jsonResponses(search);






/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', {
    title: 'K-Planleggeren',
    search: search,
    data: list });
});

module.exports = router;
