const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");
const cookieparser = require("cookie-parser");

router.post("/", function(req, res){

	console.log("Skal være logget inn: " + req.cookies.data.is_authenticated);

	authenticate.logout(req, function(data){

		//console.log("kolonial: " + JSON.stringify(data));

		res.clearCookie("data");
		res.cookie("data", data);
		//console.log("Skal være logget ut: " + JSON.stringify(res.cookies));

		//console.log("Skal være logget ut: " + res.cookies);
		/*
  if(req.cookies){
    if(req.cookies.data){
      let cookiedata = JSON.parse(req.cookies.data);
      sessionid = cookiedata.sessionid;
      console.log("HER:" + JSON.stringify(cookiedata));
    };
  };
*/
		/*
  if(req.cookies){
    if(req.cookies.data){
      let cookiedata = JSON.parse(req.cookies.data);
      sessionid = cookiedata.sessionid;
      console.log(JSON.stringify(cookiedata));
    };
  };
  */

		res.render("login", {
			title: "K-Planleggeren",
			signedin: false
		});
	});
});

module.exports = router;
