const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");


router.get("/", function(req, res) {

  
	res.render("querytest", {
    title: "K-Planleggeren",
    returnData: ""
		});

});

router.post("/", function(req, res){
  let userInput = req.body.formfield;

  



  res.render("querytest", {
    title: "K-Planleggereng",
    returnData: userInput

  });

});

module.exports = router;