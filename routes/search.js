const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('../config')

let data = "";
let search = "ost";
let list;



/* GET search page. */
router.get('/', function(req, res, next) {

    res.render('search', {
        title: 'K-Planleggeren',
        search: search,
        data: list});
});


router.post('/', function(req, res){
    search = req.body.formsearch;

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
      API
    */

    const apireq = https.get(options, (apires) =>{
        //console.log('statusCode', apires.statusCode);
        //console.log('headers:', apires.headers);
        //console.log("API:" + search);

        let chunks = [];

// Datachunks sent back is incrementally pushed into an array.
        apires.on('data', (d) => {
            chunks.push(d);
        });
// Piece together chunks in array and parse.
        apires.on('end', () => {
            let data = Buffer.concat(chunks);
            list = JSON.parse(data);
            console.log(list);
            //res.json(list);
            //res.send(list);
            res.render('search', {
                title: 'K-Planleggeren',
                search: search,
                data: list});
        });
    });

    apireq.on('error', (e) => {
        console.error(e);
    });

    apireq.end();

});


module.exports = router;
