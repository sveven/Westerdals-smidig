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

  getAllInfo(req).then(result => {
    console.log(result);
  });
  // getDaysInCurrentWeek(req).then(days => {
  // 	return days.map(day => {
  // 		let identifier = day.type + "-" + day.day;

  // 		return Promise.all(
  // 			[].concat.apply(
  // 				getAllProductInformationForDay(day),
  // 				getAllRecipeInformationForDay(day)
  // 			)
  // 		).then(res => {
  // 			let dayObject = {};
  // 			dayObject[identifier] = res;

  // 			return dayObject;
  // 		});
  // 	});
  // });

  // getAllIdsFromWeek(req).then(idArrays => {
  // 	let recipes = idArrays[0].map(recipeId => {
  // 		return helper.getInformationFromRecipe(recipeId[0]).then(res => {
  // 			//TODO: create object here

  // 			let recipe = {
  // 				Title: res.title,
  // 				Image: res.image_url,
  // 				recipeId: res.id
  // 			};
  // 			return "Recipe " + recipe;
  // 		});
  // 	});

  // 	let products = idArrays[1].map(productId => {
  // 		return helper.getInformationOfProduct(productId[0]).then(res => {
  // 			//TODO: create object here
  // 			return "Product " + res.id;
  // 		});
  // 	});

  // 	Promise.all([].concat.apply(products, recipes)).then(res => {

  // 	});
  // });

  res.render("week-planner-current", {
    title: "K-Planleggeren",
    search: search,
    data: list
  });
});

function getAllInfo(req) {
  //   let recipeIds = [];
  //   let productIds = [];

  return getDaysInCurrentWeek(req).then(days => {
    return Promise.all(getAllDaysInfo(days))
  });

  // return days.map(day => {
  //   let identifier = day.type + "-" + day.day;

  //   return Promise.all(
  //     [].concat.apply(
  //       getAllProductInformationForDay(day),
  //       getAllRecipeInformationForDay(day)
  //     )
  //   ).then(res => {
  //     let dayObject = {};
  //     dayObject[identifier] = res;
  //     return dayObject;
  //   });

  // if (getRecipeIdsInDay(day).length !== 0) {
  //     recipeIds.push(getRecipeIdsInDay(day));
  //   }

  //   if (getProductIdsInDay(day).length !== 0) {
  //     productIds.push(getProductIdsInDay(day));
  //   }
  // });
  // return [recipeIds, productIds];
}

function getAllDaysInfo(days) {
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
