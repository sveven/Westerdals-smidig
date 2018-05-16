const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");


/* GET search page. */
router.get("/", function(req, res) {
	let search = "";
	let list = [];

	res.render("singleRecipe", {
		title: "K-Planleggeren",
		search: search,
		data: list});

});

module.exports = router;
