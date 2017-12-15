const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('../config')
const authenticate = require('../components/kolonialapi/authenticate');
const cookieparser = require('cookie-parser');


/* GET search page. */
router.get('/', function(req, res, next) {


  let signedin = false;

  res.render('authenticate', {
    title: 'K-Planleggeren',
    signedin: signedin});

});


router.post('/', function(req, res){
  let signedin = false;
  let obj = {
    "username": "req.body.username",
    "password": "req.body.pass"
  }

  authenticate.authenticate(obj, function(token){

    (token != "") ? signedin = true : signedin = false;

    //Cookie: sessionid=<token>


    res.render('authenticate', {
      title: 'K-Planleggeren',
      signedin: signedin});

  });
});






module.exports = router;
