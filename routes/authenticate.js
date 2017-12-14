const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('../config')
const authenticate = require('../components/kolonialapi/authenticate');
const cookieparser = require('cookie-parser');


/* GET search page. */
router.get('/', function(req, res, next) {


  let loggedin = false;
  
  res.render('search', {
    title: 'K-Planleggeren',
    loggedin: loggedin});

});


router.post('/', function(req, res){
  let username = req.body.username;
  let pass = req.body.pass;

  authenticate.authenticate(username,pass, function(token){


    res.render('authenticate', {
      title: 'K-Planleggeren',
      search: search,
      data: list});

  });

});




module.exports = router;
