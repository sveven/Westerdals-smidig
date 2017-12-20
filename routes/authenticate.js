//torhen16@student.westerdals.no
//smidigprosjekt
const config = ("../config.js");
const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");
const cookieParser = require("cookie-parser");
const connection = require("../components/kolonialapi/requestHandler");


/* GET authenticate page. */
router.get("/", function(req, res, next) {

	if(req.cookies){
		if(req.cookies.data){
			let cookiedata = JSON.parse(req.cookies.data);
			//console.log("Cookiedata" + JSON.stringify(cookiedata));
			let sessionid = cookiedata.sessionid;
			console.log("SessionID: " + sessionid);
		}
	}


<<<<<<< HEAD
  let signedin = false;
  let cart, search;

  res.render('authenticate', {
    title: 'K-Planleggeren',
    signedin: signedin,
    cart: cart,
    search: search});
=======
	let signedin = false;
	let cart, search;
  
	res.render("authenticate", {
		title: "K-Planleggeren",
		signedin: signedin,
		cart: cart,
		search: search});
>>>>>>> 84f5db5562aecfa05eb77d300c1c6ed16d4a2a67
});


router.post("/", function(req, res){

	console.log(req);

	let sessionid, search, data;


	authenticate.authenticate(req, function(data){

		res.cookie("data", `${JSON.stringify(data)}`);

		if(req.cookies){
			if(req.cookies.data){
				let cookiedata = JSON.parse(req.cookies.data);
				sessionid = cookiedata.sessionid;
			}
		}

		connection.getCartContent(sessionid, function(list){

			res.render("authenticate", {
				title: "K-Planleggeren",
				signedin: data.is_authenticated,
				first_name: data.user.first_name,
				last_name: data.user.last_name,
				cart: list,
				search: search,
				data: data});

			//console.log("LIST: " + JSON.stringify(list));
		});

	});
});


module.exports = router;
