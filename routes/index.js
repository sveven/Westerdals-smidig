var express = require('express');
var router = express.Router();
var Request = require('request');
var list;
var search = "kake";
var config = require('../config.js');

Request.get({
  "headers": {  "content-type": "application/json",
                "user-agent": config.secretusername(),
                "x-client-token": config.secrettoken()},
 "url": "https://kolonial.no/api/v1/search/?q=" + search
}, (error, response, body) => {
    if(error) {
     return console.log(error);
    }


    //console.log(JSON.parse(body));
   list = JSON.parse(body);

   console.log(list.products[2].name);
   console.log(list.products[2].images[0].thumbnail.url);


});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'K-Planleggeren',
    search: search,
    data: list });
});

module.exports = router;
