const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const cookieParser = require("cookie-parser");
const fetch = require("../queries/plannerFetchQueries");
const helper = require("../queries/queriesHelperMethods");
const fs = require("fs");

router.get("/", function(req, res) {
	let search = "";
	let list = [];
	let week = {};

	getAllInformationAsJson(req)
		.then(result => {
			let formattedJson = formatJsonObject(result);

			res.render("week-planner-current", {
				title: "K-Planleggeren",
				search: search,
				data: list,
				week: formattedJson
			});
		})
		.catch(err => {
			console.log(err);
			res.render("week-planner-current", {
				title: "K-Planleggeren",
				search: search,
				data: list,
				week: err
			});
		});
});

router.get("/all-information/", function(req, res) {
	getAllInformationAsJson(req).then(result => {
		res.send(formatJsonObject(result));
	});
});
function formatJsonObject(currentJsonObject) {
	let result = {};

	for (day of currentJsonObject) {
		let dayObject = {};
		let meals = [];
		let products = [];

		let identifier = Object.keys(day)[0];

		for (item of Object.values(day)[0]) {
			if (item.hasOwnProperty("ProductId")) {
				products.push(item);
			} else if (item.hasOwnProperty("RecipeId")) {
				meals.push(item);
			}
		}

		result[identifier] = {
			Meals: meals,
			Products: products
		};
	}
	return result;
}

function getAllInformationAsJson(req) {
	return getDaysInCurrentWeek(req).then(days => {
		return Promise.all(getInformationForAllDays(days));
	});
}

function getDaysInCurrentWeek(req) {
	return fetch
		.fetchAllProductsInWeek(req.cookies.ukeId)
		.then(result => {
			return result.Days;
		})
		.catch(err => {
			console.log(err);
		});
}

function getInformationForAllDays(days) {
	return days.map(day => {
		let identifier = day.type + day.day;

		return Promise.all(
			[].concat.apply(
				getAllProductInformationForDay(day),
				getAllRecipeInformationForDay(day)
			)
		).then(res => {
			let dayObject = {};
			dayObject[identifier] = res;
			return dayObject;
		});
	});
}

/**
 * This is a promise which will be put in a promise.all()
 */
function getAllRecipeInformationForDay(day) {
	return day.Meals.map(meal => {
		return helper.getInformationFromRecipe(meal.recipeId).then(res => {
			return {
				Title: res.title,
				Image: res.feature_image_url,
				RecipeId: res.id
			};
		});
	});
}

function getAllProductInformationForDay(day) {
	return day.Products.map(product => {
		return helper.getInformationOfProduct(product.kolonialId).then(res => {
			return {
				Name: res.name,
				Image: res.images[0].thumbnail.url,
				Price: res.gross_price,
				ProductId: res.id
			};
		});
	});
}

module.exports = router;
