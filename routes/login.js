const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");

router.get("/", function(req, res){

	let signedin = false;

	if (!req.cookies.data || !req.cookies.data.is_authenticated === "undefined" || req.cookies.data.is_authenticated === false){
		res.render("login", {
			title: "K-Planleggeren",
			signedin: signedin
		});
	} else if (req.cookies.data.is_authenticated === true){

		res.render("login", {
			title: "K-Planleggeren",
			signedin: true,
			first_name: req.cookies.data.user.first_name,
			last_name: req.cookies.data.user.last_name
		});

		//res.redirect(req.cookies.redirectPath);
	}

	//next();
});

router.post("/", function(req, res){
	var username = req.body.username;
	var password = req.body.pass;

	//console.log("Skal være logget ut: " + JSON.stringify(req.cookies.data.is_authenticated));

	authenticate.login(username, password, function(data){

		res.cookie("data", data);

		if(res.cookies){
			if(res.cookies.data){
				let cookiedata = JSON.parse(res.cookies.data);
				sessionid = cookiedata.sessionid;
				console.log(JSON.stringify(cookiedata));
			}
		}

		//console.log(req.cookies.requestPath);

		res.render("login", {
			title: "K-Planleggeren",
			signedin: true,
			first_name: data.user.first_name,
			last_name: data.user.last_name});
	});
});

module.exports = router;
