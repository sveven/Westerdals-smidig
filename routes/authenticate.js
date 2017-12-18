//torhen16@student.westerdals.no
//smidigprosjekt
const config = ('../config.js')
const express = require('express');
const router = express.Router();
const authenticate = require('../components/kolonialapi/authenticate');
const cookieParser = require('cookie-parser');
const connection = require('../components/kolonialapi/requestHandler');


/* GET authenticate page. */
router.get('/', function(req, res, next) {

  //console.log(req.cookies);
  //console.log("Sesh: " + req.cookies.data);
  if(req.cookies){
    let cookiedata = JSON.parse(req.cookies.data);
    console.log("Cookiedata" + JSON.stringify(cookiedata));
    let sessionid = cookiedata.sessionid;
    console.log("SessionID: " + sessionid);
  };


  let signedin = false;
  let cart;
  res.render('authenticate', {
    title: 'K-Planleggeren',
    signedin: signedin,
    cart: cart});
});


router.post('/', function(req, res){

  let sessionid;

  if(req.cookies){
    let cookiedata = JSON.parse(req.cookies.data);
    sessionid = cookiedata.sessionid;
  };

  authenticate.authenticate(req, function(data){

    res.cookie("data", `${JSON.stringify(data)}`);



    connection.getCartContent(sessionid, function(list){

    res.render('authenticate', {
      title: 'K-Planleggeren',
      signedin: data.is_authenticated,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      cart: list});

      console.log("LIST: " + JSON.stringify(list));
    });

  });
});


module.exports = router;
