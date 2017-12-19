const express = require('express');
const router = express.Router();
const authenticate = require('../components/kolonialapi/authenticate');
const cookieparser = require('cookie-parser');

router.get('/', function(req, res, next){

  let signedin = false;

  //console.log("req.session.sessionid " + JSON.stringify(req.session.sessionid));

  if(req.cookies.data.is_authenticated === true){
    res.render('login', {
      title: 'K-Planleggeren',
      signedin: true,
      first_name: req.cookies.data.user.first_name,
      last_name: req.cookies.data.user.last_name
    });
  };

  res.render('login', {
    title: 'K-Planleggeren',
    signedin: signedin
  });

});

router.post('/', function(req, res, next){
  var username = req.body.username;
  var password = req.body.pass;

  console.log("Skal være logget ut: " + JSON.stringify(req.cookies.data.is_authenticated));

  authenticate.login(username, password, function(data){
    // Store sessionid in cookie.
    //res.cookie("data", `${JSON.stringify(data)}`);
    res.cookie("data", data);

    //console.log("LOGIN: " + );

    if(res.cookies){
      if(res.cookies.data){
        let cookiedata = JSON.parse(res.cookies.data);
        sessionid = cookiedata.sessionid;
        console.log(JSON.stringify(cookiedata));
      };
    };

    res.render('login', {
      title: 'K-Planleggeren',
      signedin: true,
      first_name: data.user.first_name,
      last_name: data.user.last_name});

  });
});

module.exports = router;
