let express = require('express');
let router = express.Router();
let https = require('https');
let config = require('../config');

let list;
let search = "";


//Parameters for API search.

module.exports.searchForRecipe = function(req, res){
    let s = search;
    s = req.body.formsearch;

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

    https.get(options, function(apires) {
        let chunks = [];
        // Datachunks sent back is incrementally pushed into an array.
        apires.on('data', (d) => {
            //d == error, no information comes through. does options need an update?
            chunks.push(d);
        });

        // Piece together chunks in array and parse.

        apires.on('end', () => {
            let data = Buffer.concat(chunks);
            list = JSON.parse(data);
            console.log(list);

            res.render('recipes', {
                title: 'K-Planleggeren',
                search: s,
                data: list});

        });
    }).end();

};


module.exports.getRecipes =  function(req, res, next) {
    res.render('recipes', {
        title: 'K-Planleggeren',
        search: search,
        data: list
    });


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


    var reg = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

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

    reg.on('error', (e) => {
        console.error(e);
    });

    reg.end();
}