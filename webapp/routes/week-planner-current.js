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

  //TODO: Continue working with this json file.
  getAllInformationAsJson(req).then(res => {
	  console.log();
	  
  })

  res.render("week-planner-current", {
    title: "K-Planleggeren",
    search: search,
    data: list
  });
});

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
    let identifier = day.type + "-" + day.day;

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
        Image: res.image_url,
        RecipeId: res.id
      };
    });
  });
}

function getAllProductInformationForDay(day) {
  return day.Products.map(product => {
    return helper.getInformationOfProduct(product.kolonialId).then(res => {
      return {
        Name: res.full_name,
        Image: res.images[0].thumbnail.url,
        Price: res.gross_price
      };
    });
  });
}

module.exports = router;
