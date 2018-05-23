const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");


/* GET home page. */
router.get("/", function(req, res, next) {

	let search = "ost";

	connection.searchForProduct(search, function(list){

		res.render("index", {
			title: "K-Planleggeren",
			search: search,
			data: list });
	});

});

module.exports = router;
