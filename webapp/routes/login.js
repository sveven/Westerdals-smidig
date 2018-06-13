const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");
const update = require("../queries/plannerUpdateQueries");
const fetch = require("../queries/plannerFetchQueries");

router.get("/", function(req, res) {
  let signedin = false;

  if (
    !req.cookies.data ||
    !req.cookies.data.is_authenticated === "undefined" ||
    req.cookies.data.is_authenticated === false
  ) {
    res.render("login", {
      title: "K-Planleggeren",
      signedin: signedin
    });
  } else if (req.cookies.data.is_authenticated === true) {

  }

  res.send();
});

router.post("/", function(req, res) {
  var username = req.body.username;
  var password = req.body.pass;

  authenticate.login(username, password, function(data) {
    res.cookie("data", data);

	update.updateUserWithKolonialId(req.cookies.planleggerId, data.user.id);
	

	  if (res.cookies) {
		if (res.cookies.data) {
		  let cookiedata = JSON.parse(res.cookies.data);
		  sessionid = cookiedata.sessionid;
		}
	  }
  
	  res.send();

  });
});

module.exports = router;
