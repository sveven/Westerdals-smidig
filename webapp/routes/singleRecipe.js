const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const createQueries = require("../queries/plannerCreateQueries");

/* GET search page. */
router.get("/", function(req, res) {
	let search = "";
	let list = [];

	res.render("singleRecipe", {
		title: "K-Planleggeren",
		search: search,
		data: list
	});
});

router.get("/:recipe_id", function(req, res) {

	let dayid = req.param("dayid");

	connection.getRecipeById(req.params.recipe_id, function(list) {
		res.render("singleRecipe", {
			title: "K-Planleggeren",
			data: list,
			dayid: dayid
		});
	});
});

router.post("/:recipe_id/:portions", function(req, res) {

	let recipeId = req.params.recipe_id;

	let type = req.cookies.type;
	let portions = req.params.portions;
	let dayId = req.cookies.dayId;
	createQueries.addMealToDayQuery(recipeId,  portions, dayId).then(result => {
		console.log(result);
	}).catch(err => {
		res.status(500).send({error: err});
	});

	res.redirect("/week-planner-current");

});

module.exports = router;
