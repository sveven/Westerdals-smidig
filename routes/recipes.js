let express = require('express');
let router = express.Router();
let https = require('https');
let config = require('../config');

let list = "";
let search = "";


/* GET recipes page. */
router.get('/', function(req, res, next) {
    res.render('recipes', {
        title: 'K-Planleggeren',
        search: search,
        data: list});
    
    
});

router.post('/', function(req, res){
    search = req.body.formsearch;

    console.log("Formsearch: " + search);
    if(search !== "") {
        onSearch();
    }

    res.render('recipes', {
        title: 'K-Planleggeren',
        search: search,
        data: list});
});

//Parameters for API search.

function onSearch() {

    options = {
        host: 'kolonial.no',
        port: 443,
        path: '/api/v1/search/recipes/?q=' + search,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "User-Agent": config.secretusername,
            "X-Client-Token": config.secrettoken
        }
    };

    https.get(options, function(res) {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        let chunks = [];
        // Datachunks sent back is incrementally pushed into an array.
        res.on('data', (d) => {

            //d == error, no information comes through. does options need an update?
            chunks.push(d);
        });

        // Piece together chunks in array and parse.

        res.on('end', () => {
            let data = Buffer.concat(chunks);
            list = JSON.parse(data);

        });
    }).end;

}

let options = {
    host: 'kolonial.no',
    port: 443,
    path: '/api/v1/search/recipes/?q=' + search,
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

var req = https.get(options, (res) => {
    //    console.log('statusCode:', res.statusCode);
    //    console.log('headers:', res.headers);
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

module.exports = router;
