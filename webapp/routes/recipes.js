const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");

/* GET search page. */
router.get("/", function(req, res) {
	let search = "";
	let list = [];
	let showEntirePage = req.body.ajax;
	console.log(" Her ER DET" + showEntirePage);

	if (showEntirePage !== "undefined" || showEntirePage !== true) {
		showEntirePage = false;
	}

	res.render("recipes", {
		title: "K-Planleggeren",
		search: search,
		data: list
	});
});

router.get("/partial", function(req, res) {
	let search = "";
	let list = [];
	let showEntirePage = req.body.ajax;

	if (showEntirePage !== "undefined" || showEntirePage !== true) {
		showEntirePage = false;
	}

	res.render("../views/partials/recipesPartial.ejs", {
		title: "K-Planleggeren",
		search: search,
		data: list
	});
});

router.post("/", function(req, res) {
	let acceptsJSON = req.accepts("json");

	if (acceptsJSON) {
    
		connection.searchForRecipe(req.body.recipeQuery, function(data) {
      res.send(data);
    });
    
	} else {
		let search = req.body.formInput;

		connection.searchForRecipe(search, function(list) {
			res.render("recipes", {
				title: "K-Planleggeren",
				search: search,
				data: list
			});
		});
	}
});

module.exports = router;
