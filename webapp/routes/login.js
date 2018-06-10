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

  authenticate.login(username, password, function(data) {
    res.cookie("data", data);

	update.updateUserWithKolonialId(req.cookies.planleggerId, data.user.id);
	
	
    // fetch.fetchAllWeeksForKolonialUser(data.user.id).then(users => {
    //   let weeks = [];
    //   for (user of users) {
    //     for (week of user.Weeks) {
    //       let newWeek = {
    //         id: week.id,
    //         name: week.name
    //       };
    //       if (newWeek.name === null) {
    //         newWeek.name = "Hektisk Uke";
    //       }
    //       weeks.push(newWeek);
    //     }
    //   }
	//   res.locals.weeks = weeks;
	  

	  if (res.cookies) {
		if (res.cookies.data) {
		  let cookiedata = JSON.parse(res.cookies.data);
		  sessionid = cookiedata.sessionid;
		}
	  }
  
	  res.send();
    // }).catch(err => {
	// 	if (res.cookies) {
	// 		if (res.cookies.data) {
	// 		  let cookiedata = JSON.parse(res.cookies.data);
	// 		  sessionid = cookiedata.sessionid;
	// 		}
	// 	  }
	  
	// 	  res.send();
	// })

    
  });
});

module.exports = router;
