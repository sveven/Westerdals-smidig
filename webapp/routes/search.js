const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");

const searchPartial = "../views/partials/searchPartial.ejs";

/* GET search page. */
router.get("/", function(req, res) {
	let search = "";
	let list;
	let categories;

	connection.getAllProductCategories(function(cat) {

		res.render("search", {
			title: "K-Planleggeren",
			search: search,
			data: list,
			categories: cat
		});
	});
  
});

router.get("/partial", function(req, res) {
	let search = "";
	let list;
	let categories;

	connection.getAllProductCategories(function(cat) {


    //console.log("ALTSÅ SÅ LANGT VIRKER DET." + __dirname + "../views/partials/searchPartial");
		res.render(searchPartial, {
			search: search,
			data: list,
			categories: cat
		});
	});
  
});



router.post("categories/ajax/:id", function(req, res){


	connection.getAllProductsFromCategory( categoriesId, function(categoriesItems){
    
		let categoriesId = req.params.id;
		let data = categoriesItems;

		res.send(data);
  
	});

});


router.get("/categories/:id", function(req, res){


	var categoriesId = req.params.id;
	var search = "";
	var cat = "";
  


	connection.getAllProductsFromCategory( categoriesId, function(categoriesItems) {

		res.render("search", {

			title: "K-Planleggeren",
			search: search,
			data: categoriesItems,
			categories: cat
		});
  

	});

});

router.post("/", function(req, res) {
	let search = req.body.formsearch;
	let ajax = req.body.ajax;
	connection.searchForProduct(search, function(list) {
		if (ajax === "true") {
			res.send(list);
		} else {
			res.render("search", {
				title: "K-Planleggeren",
				search: search,
				data: list
			});
		}
	});
});
module.exports = router;
