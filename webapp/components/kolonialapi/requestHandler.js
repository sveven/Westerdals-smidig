var config = require("../../config");
var request = require("./request.js");

/*
    This is supposed to a dynamic connection to the
    kolonial.no api. Sould return a connection or
    just the json file?
*/

//Search for products
const itemSearch = "/api/v1/search/?q=";

//Search for recipes
const recipeSearch = "/api/v1/search/recipes/?q=";

//Get productcategories
const productCategories = "/api/v1/productcategories/";
//Get products from product category
const productCategoriesId = "/api/v1/productcategories/";

//Get extended info on single product
const productInformation = "/api/v1/products/";

// Get all recipes
const recipes = "/api/v1/recipes/";
// Get recipes by id
const recipeByID = "/api/v1/recipes/";
// Vet ikke helt hva dette er
const recipesCurrentPlan = "/api/v1/recipes/plans/current/";
//Recipes liked
const recipesLikedByUser = "/api/v1/recipes/likes/";
//recipes purchased
const recipesPurchasedByUser = "/api/v1/recipes/purchased";
//Toggle like on recipe by ID
const recipeToggleLike = "/like-toggle/";
//getting the user's cart
const userCart = "/api/v1/cart/";
//Adjusting a carts items
const alterCartContent = "/api/v1/cart/items/";
//Clear the cart
const clearCartItems = "/api/v1/cart/clear/";

/*

Endpoints that require login.

GET  /api/v1/recipes/likes/
GET  /api/v1/recipes/purchased/
POST /api/v1/recipes/<recipe_id>

GET /api/v1/cart/

POST /api/v1/cart/items/
    {"items": [{
        "product_id": 9329, "quantity": 2,
        "product_id": 15163, "quantity": -1
    }]}

POST /api/v1/cart/clear/
*/

let options = {
  host: "kolonial.no",
  port: 443,
  path: "",
  method: "GET",
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': config.secretusername,
    'X-Client-Token': config.secrettoken
  }
};

module.exports = {
  /**
   * Returns a list of recipes based on search value
   * @param search
   * @param callback
   */
  searchForRecipe: function(search, callback) {
    options.path = recipeSearch + search;

    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Returns a list of items based on a search value
   * @param search
   * @param callback
   */
  searchForProduct: function(search, callback) {
    options.path = itemSearch + search;

    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  // Start of products endpoint
  /**
   * Returns all product categories
   * @param callback
   */
  getAllProductCategories: function(callback) {
    options.path = productCategories;

    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Returns all products in a given product category id
   * @param productCategoryId
   * @param callback
   */
  getAllProductsFromCategory: function(productCategoryId, callback) {
    options.path = productCategoriesId + productCategoryId + "/";

    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Returns all products in a given product category id with all it's children.
   * @param productCategoryId
   * @param callback
   */
  getAllProductsFromCategoryWithAllProductsFromChildren: function(
    productCategoryId,
    callback
  ) {
    options.path = productCategoriesId + productCategoryId + "/";
    let products = [];

    request.kolonialAPIRequest(options, function(list) {
      if (list.children.length > 0) {
        for (let i = 0; i < list.children.length; i++) {
          options.path = productCategoriesId + list.children[i] + "/";

          request.kolonialAPIRequest(options, function(child) {
            products.push(child.products);
          });
        }
      }
    });
  },

  /**
   * Returns extended information about a product by id
   * @param productId
   * @param callback
   */
  getExtendedInformationAboutSpecificProduct: function(productId, callback) {
    options.path = productInformation + productId + "/";
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },
  //End of products endpoint

  //start of recipes endpoint

  /**
   * Returns all recipes
   * @param callback
   */
  getAllRecipes: function(callback) {
    options.path = recipes;
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Gets a recipe by ID
   * @param recipeId
   * @param callback
   */
  getRecipeById: function(recipeId, callback) {
    options.path = recipeByID + recipeId + "/";
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Gets recipes from the current plan
   * @param callback
   */
  getRecipesFromCurrentPlan: function(callback) {
    options.path = recipesCurrentPlan;
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  //Start of endpoint for user specific recipes
  getRecipesLikedByUser: function(callback) {
    options.path = recipesCurrentPlan;
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Toggles a like on the recipe
   * @param recipeId
   * @param callback
   */
  toggleLikeOnRecipe: function(recipeId, callback) {
    options.path = recipeByID + recipeId + recipeToggleLike;
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Returns the contents in the cart
   * @param callback
   */
  getCartContent: function(sessionid, callback) {
    options.path = userCart;
    options.headers.cookie = "sessionid=" + sessionid;
    console.log(options);
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Adjusts the carts contents.
   * Callback sends an object
   * @param callback
   */
  adjustCartContents: function(callback) {
    options.path = alterCartContent;
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  },

  /**
   * Clears all the items in the cart
   * @param callback
   */
  clearAllCartItems: function(callback) {
    options.path = clearCartItems;
    request.kolonialAPIRequest(options, function(list) {
      callback(list);
    });
  }
};
