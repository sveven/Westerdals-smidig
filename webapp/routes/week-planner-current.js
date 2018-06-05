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

  getAllIdsFromWeek(req).then(idArrays => {
    let recipes = idArrays[0].map(recipeId => {
      return helper.getInformationFromRecipe(recipeId[0]).then(res => {
		  //TODO: create object here
		  console.log(res);
		  
		  let recipe = {
			  Title: res.title,
			  Image: res.image_url,
			  recipeId: res.id
		  };
        return "Recipe " + recipe;
      });
    });

    let products = idArrays[1].map(productId => {
      return helper.getInformationOfProduct(productId[0]).then(res => {
		  //TODO: create object here
		  return "Product " + res.id;
      });
    });

    Promise.all([].concat.apply(products, recipes)).then(res => {
		

      console.log("res " + res);
    });
  });

  res.render("week-planner-current", {
    title: "K-Planleggeren",
    search: search,
    data: list
  });
});

function getAllIdsFromWeek(req) {
  let recipeIds = [];
  let productIds = [];
  return getDaysInCurrentWeek(req).then(days => {
    days.forEach(day => {
      if (getRecipeIdsInDay(day).length !== 0) {
        recipeIds.push(getRecipeIdsInDay(day));
      }

      if (getProductIdsInDay(day).length !== 0) {
        productIds.push(getProductIdsInDay(day));
      }
    });
    return [recipeIds, productIds];
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

function getAllInformationForDay(day) {}

function getRecipeIdsInDay(day) {
  let recipeIds = [];
  day.Meals.forEach(meal => {
    recipeIds.push(meal.recipeId);
  });

  return recipeIds;
}

function getProductIdsInDay(day) {
  let productIds = [];

  day.Products.forEach(product => {
    productIds.push(product.kolonialId);
  });

  return productIds;
}

module.exports = router;
