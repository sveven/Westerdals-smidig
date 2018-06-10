const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");
const cookieparser = require("cookie-parser");

router.post("/", function(req, res){

	//console.log("Skal være logget inn: " + req.cookies.data.is_authenticated);

	authenticate.logout(req, function(data){
		res.clearCookie("data");
		res.cookie("data", data);
		res.locals.ukeId = null;
    res.send();
    
	});
});

module.exports = router;
