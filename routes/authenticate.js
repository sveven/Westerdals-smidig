//torhen16@student.westerdals.no
//smidigprosjekt

const express = require('express');
const router = express.Router();
const https = require('https');
const config = require('../config')
const authenticate = require('../components/kolonialapi/authenticate');
const cookieparser = require('cookie-parser');
const request = require('request');




/* GET search page. */
router.get('/', function(req, res, next) {


  let signedin = false;

  res.render('authenticate', {
    title: 'K-Planleggeren',
    signedin: signedin});

});


router.post('/', function(req, res){

  let obj = {
    "username": req.body.username,
    "password": req.body.pass
  };

  authenticate.authenticate(obj, function(data){

    (data.is_authenticated === true) ? signedin = 1 : signedin = 0;

    //res.cookie(cookie_name , 'cookie_calue').send('Cookie is set');

    res.render('authenticate', {
      title: 'K-Planleggeren',
      signedin: signedin,
      first_name: data.user.first_name});

  });
});


module.exports = router;
