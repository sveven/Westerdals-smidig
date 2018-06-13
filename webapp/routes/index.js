const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");


/* GET home page. */
router.get("/", function (req, res, next) {

	
	res.render("index", {
		title: "K-Planleggeren",
	});

});

module.exports = router;
