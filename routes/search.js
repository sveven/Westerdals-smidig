

const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");


/* GET search page. */
router.get("/", function(req, res) {


	let search = "";
	let list;

	res.render("search", {
		title: "K-Planleggeren",
		search: search,
		data: list});

});


router.post("/", function(req, res){
	let search = req.body.formsearch;
	let ajax = req.body.ajax;

	connection.searchForProduct(search, function(list){


		if(ajax === "true"){
			let data = list;
			res.send(data);


		} else {
			res.render("search", {
				title: "K-Planleggeren",
				search: search,
				data: list});

		}
	});
});
module.exports = router;
