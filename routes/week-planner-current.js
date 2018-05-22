const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const cookieParser = require("cookie-parser");
const fs = require("fs");


router.get("/", function(req, res) {
	let search = "";
	let list = [];

	res.render("week-planner-current", {
		title: "K-Planleggeren",
		search: search,
		data: list
	});


});
module.exports = router;
