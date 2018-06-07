const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");
const fetch = require("../queries/plannerFetchQueries");
const helper = require("../queries/queriesHelperMethods");

/* GET cart page. */
router.get("/", function(req, res) {
  let list;

  

  getWeekOverViewAsJson(req).then(result => {

    res.render("cart", {
      title: "K-Planleggeren",
      data: result
    });
    
  }).catch(err => {

    res.render("cart", {
      title: "K-Planleggeren",
      data: err
    });

  });

});

router.post("/", function(req, res) {});

function getWeekOverViewAsJson(req) {
  return getAllInformationForWeek(req).then(res => {
    return formatJsonObjectForWeekOverview(res);
  });
}

function getCartOverviewAsJson(req) {
  return getAllInformationForWeek(req).then(res => {
    return formatJsonObjectForCart(res);
  })
}

function getAllInformationForWeek(req) {
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
 * @param {*} day
 */
function getAllProductInformationForDay(day) {
  return day.Products.map(product => {
    return getFormattedInformationOnProduct(
      product.kolonialId,
      product.ProductInDay.productQuantity
    );
  });
}

function getAllProductInformationForMeal(meal) {
  return meal.Products.map(product => {
    //TODO: Current rounds up to closest upwards integer, due to limitations in database.
    let quantity = Math.ceil(
      meal.portions * product.ProductInMeal.portionQuantity
    );

    return getFormattedInformationOnProduct(product.kolonialId, quantity);
  });
}

function getAllProductInformationForWeek(products) {
  return products.map(product => {
    return getFormattedInformationOnProduct(
      product.kolonialId,
      product.ProductInWeek.productQuantity
    );
  });
}

function getFormattedInformationOnProduct(kolonialId, quantity) {
  return helper.getInformationOfProduct(kolonialId).then(res => {
    return {
      Name: res.full_name,
      Image: res.images[0].thumbnail.url,
      Price: parseInt(res.gross_price),
      Quantity: quantity,
      ProductId: res.id
    };
  });
}

function formatJsonObjectForWeekOverview(currentJsonObject) {
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
  
  result = removeDuplicatesFromWeekJson(result);
  result["TotalPrice"] = calculateTotalPriceForCart(result);

  return result;
}

function formatJsonObjectForCart(currentJsonObject) {
  let result = {};
  let products = [];
  
  for(obj of currentJsonObject[0]){
    if(obj.hasOwnProperty("Products")){
      for(product of obj.Products) {
        let formattedProduct = {
          product_id: product.ProductId,
          quantity: product.Quantity
        }
        products.push(formattedProduct);
      }
    } else {
      let formattedProduct = {
        product_id: obj.ProductId,
        quantity: obj.Quantity
      }
      products.push(formattedProduct);
    }
  }
  result["items"] = products;
  result = removeDuplicatesFromCartJson(result);
  return result;
}


function calculateTotalPriceForCart(currentJsonObject) {
  let totalPrice = 0;

  for (meal of currentJsonObject.Meals) {
    for (product of meal.Products) {
      totalPrice += product.Price * product.Quantity;
    }
  }
  for (product of currentJsonObject.Products) {
    totalPrice += product.Price * product.Quantity;
  }
  return totalPrice;
}

function removeDuplicatesFromWeekJson(currentJsonObject) {
  let resultProducts = [];

  for (product of currentJsonObject.Products) {
    if (resultProducts.length === 0) {
      resultProducts.push(product);
    } else {
      let found = false;
      for (filteredProduct of resultProducts) {
        if (filteredProduct.ProductId === product.ProductId) {
          found = true;
          filteredProduct.Quantity += product.Quantity;
        } 
      }

      if (!found) {
        resultProducts.push(product);
        found = false;
      }
    }
  }
  currentJsonObject.Products = resultProducts;
  return currentJsonObject;
}

function removeDuplicatesFromCartJson(currentJsonObject) {
  let resultProducts = [];
  
  for (product of currentJsonObject.items) {
    if (resultProducts.length === 0) {
      resultProducts.push(product);
    } else {
      let found = false;
      for (filteredProduct of resultProducts) {
        if (filteredProduct.product_id === product.product_id) {
          found = true;
          filteredProduct.quantity += product.quantity;
        } 
      }

      if (!found) {
        resultProducts.push(product);
        found = false;
      }
    }
  }
  currentJsonObject["items"] = resultProducts;
  return currentJsonObject;
}

module.exports = router;
