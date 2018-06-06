const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");
const fetch = require("../queries/plannerFetchQueries");
const helper = require("../queries/queriesHelperMethods");

/* GET cart page. */
router.get("/", function(req, res) {
  let list;
  
  res.render("cart", {
    title: "K-Planleggeren",
    data: list
  });
});

router.post("/", function(req, res) {});

function getAllInformationAsJson(req) {
  // return getDaysInCurrentWeek(req).then(days => {
  //   return Promise.all(getInformationForAllDays(days));
  // });
  return getAllInformationOnCurrentWeek(req).then(res => {
    return formatJsonObject(res);
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

function getProductsInCurrentWeek(req) {
  return fetch
    .fetchAllProductsInWeek(req.cookies.ukeId)
    .then(result => {
      return result.Products;
    })
    .catch(err => {
      console.log(err);
    });
}

function getAllInformationOnCurrentWeek(req) {
  return fetch.fetchAllProductsInWeek(req.cookies.ukeId).then(res => {
    getAllProductInformationForWeek(res.Products);

    return Promise.all(
      [].concat.apply(
        getInformationForAllDays(res.Days),
        getAllProductInformationForWeek(res.Products)
      )
    ).then(result => {
      return result;
    });
  });
}

function getInformationForAllDays(days) {
  return days.map(day => {
    // let identifier = day.type + "-" + day.day;

    return Promise.all(
      [].concat.apply(
        getAllProductInformationForDay(day),
        getAllRecipeInformationForDay(day)
      )
    );
  });
}

/**
 * This is a promise which will be put in a promise.all()
 */
function getAllRecipeInformationForDay(day) {
  return day.Meals.map(meal => {
    return Promise.all(getAllProductInformationForMeal(meal)).then(
      mealProducts => {
        return helper
          .getInformationFromRecipe(meal.recipeId)
          .then(recipeInformation => {
            return {
              Title: recipeInformation.title,
              Image: recipeInformation.feature_image_url,
              RecipeId: recipeInformation.id,
              Products: mealProducts
            };
          });
      }
    );
  });
}

/**
 * TODO: Changed
 * @param {*} day
 */
function getAllProductInformationForDay(day) {
  return day.Products.map(product => {
    return getFormattedInformationOnProduct(product.kolonialId);
  });
}

function getAllProductInformationForMeal(meal) {
  return meal.Products.map(product => {
    return getFormattedInformationOnProduct(product.kolonialId);
  });
}

function getAllProductInformationForWeek(products) {
  return products.map(product => {
    return getFormattedInformationOnProduct(product.kolonialId);
  });
}

function getFormattedInformationOnProduct(kolonialId) {
  return helper.getInformationOfProduct(kolonialId).then(res => {
    return {
      Name: res.full_name,
      Image: res.images[0].thumbnail.url,
      Price: res.gross_price,
      ProductId: res.id
    };
  });
}

function formatJsonObject(currentJsonObject) {
  let result = {};
  let meals = [];
  let products = [];

  for (obj of currentJsonObject) {
    if (obj.hasOwnProperty("ProductId")) {
      products.push(obj);
    }
    for (item of Object.values(obj)) {
      if (item.hasOwnProperty("ProductId")) {
        products.push(item);
      } else if (item.hasOwnProperty("RecipeId")) {
        meals.push(item);
      }
    }
  }
  result = {
    Meals: meals,
    Products: products
  };

  return result;
}
module.exports = router;
