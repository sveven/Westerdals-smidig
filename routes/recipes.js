let express = require('express');
let router = express.Router();
let https = require('https');
let config = require('../config');



/*
//Have in own file, get by json "recipe", "search", etc
let options = {
    host: 'kolonial.no',
    port: 443,
    path: '/api/v1/search/recipes/?q=',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "User-Agent": config.secretusername,
        "X-Client-Token": config.secrettoken
    }
};
//
// /* GET recipes page. */
// router.get('/', function(req, res) {
//     let searchWord = "";
//     let resultList = "";
//
//     res.render('recipes', {
//         title: 'K-Planleggeren',
//         search: searchWord,
//         data: resultList});
// });
//
// router.post('/', function(req, res){
//     let searchWord = req.body.formsearch;
//
//     console.log("Formsearch: " + searchWord);
//     updateResultListBasedOnSearch(req,res, searchWord);
//     /***
//      * Start of testing of using req and res outside of function
//      */
// });
//
// function updatePath(searchWord) {
//     options.path = '/api/v1/search/recipes/?q=' + searchWord;
// }
//
// function updateResultListBasedOnSearch(req, res, searchWord) {
//     updatePath(searchWord);
//
//     https.get(options, function(result) {
//         let chunks = [];
//         // Datachunks sent back is incrementally pushed into an array.
//         result.on('data', (d) => {
//
//             //d == error, no information comes through. does options need an update?
//             chunks.push(d);
//         });
//
//         // Piece together chunks in array and parse.
//
//         result.on('end', () => {
//             let data = Buffer.concat(chunks);
//             let resultList = JSON.parse(data);
//             res.render('recipes', {
//                 title: 'K-Planleggeren',
//                 search: searchWord,
//                 data: resultList});
//
//         });
//     });
// }
// /*
//
//   API request to kolonial.no
//   This should be a module
//
// */
//
// var req = https.get(options, (res) => {
//     let chunks = [];
//
//     // Datachunks sent back is incrementally pushed into an array.
//     res.on('data', (d) => {
//         chunks.push(d);
//     });
//
//     // Piece together chunks in array and parse.
//
//     res.on('end', () => {
//         let data = Buffer.concat(chunks);
//         resultList = JSON.parse(data);
//         let resultList = JSON.parse(data);
//         res.render('recipes', {
//             title: 'K-Planleggeren',
//             search: searchWord,
//             data: resultList});
//     });
// });
//
// req.on('error', (e) => {
//     console.error(e);
// });
//
// req.end();
module.exports = router;
