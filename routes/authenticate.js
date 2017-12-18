//torhen16@student.westerdals.no
//smidigprosjekt
const express = require('express');
const router = express.Router();
const authenticate = require('../components/kolonialapi/authenticate');
const cookieparser = require('cookie-parser');


/* GET search page. */
router.get('/', function(req, res, next) {

  res.cookieparser

  let signedin = false;

  res.render('authenticate', {
    title: 'K-Planleggeren',
    signedin: signedin});

});


router.post('/', function(req, res){

  authenticate.authenticate(req, function(data){

    (data.is_authenticated === true) ? signedin = 1 : signedin = 0;

    res.render('authenticate', {
      title: 'K-Planleggeren',
      signedin: data.is_authenticated,
      first_name: data.user.first_name,
      last_name: data.user.last_name});

  });
});


module.exports = router;
