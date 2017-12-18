const express = require('express');
const router = express.Router();
const authenticate = require('../components/kolonialapi/authenticate');
const cookieparser = require('cookie-parser');

router.post('/', function(req, res){

authenticate.logout(req, function(data){

  console.log(data);

  let first_name;
  let last_name;
  let cart;
  res.render('authenticate', {
    title: 'K-Planleggeren',
    signedin: data.is_authenticated,
    first_name: first_name,
    last_name: last_name,
    cart: cart});

  });
});

module.exports = router;
