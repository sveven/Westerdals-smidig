const express = require('express');
const router = express.Router();
const authenticate = require('../components/kolonialapi/authenticate');
const cookieparser = require('cookie-parser');

router.post('/', function(req, res){

authenticate.logout(req, function(data){

  res.render('authenticate', {
    title: 'K-Planleggeren',
    signedin: data.is_authenticated,
    first_name: data.user.first_name,
    last_name: data.user.last_name});

  });
});

module.exports = router;
