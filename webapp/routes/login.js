const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");
const update = require("../queries/plannerUpdateQueries");

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
    /*
				res.render("login", {
					title: "K-Planleggeren",
					signedin: true,
					first_name: req.cookies.data.user.first_name,
					last_name: req.cookies.data.user.last_name
				});*/
    //res.redirect(req.cookies.redirectPath);
  }

  res.send();
});

router.post("/", function(req, res) {
  var username = req.body.username;
  var password = req.body.pass;

  //   console.log("LOGIN: ");
  //   console.log(JSON.stringify(req.body));

  authenticate.login(username, password, function(data) {
	  //Updates the current planleggerId with the kolonial user id.
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
