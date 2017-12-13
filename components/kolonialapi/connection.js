
var config = require('../../config');
var request = require('./request.js');


/*
    This is supposed to a dynamic connection to the
    kolonial.no api. Sould return a connection or
    just the json file?
*/

//Search for products
const searchPath = '/api/v1/search/?q=';

//Search for recipes
const recipeSearchPath = '/api/v1/search/recipes/?q=';

//Get productcategories
const productCategories = '/api/v1/productcategories/';
//Get products from product category
const productCategoriesId = '/api/v1/productcategories/<product_category_id>/';

//Get extended info on single product
const productInfo = '/api/v1/productcategories/<product_category_id>/';

// Get recipes
const recipes = '/api/v1/recipes/';
// Get recipes by id
const recipesID = '/api/v1/recipes/<recipe_id>/';
// Vet ikke helt hva dette er
const recipesPlans = '/api/v1/recipes/plans/current/';



/*

Endpoints that require login.

GET  /api/v1/recipes/likes/
GET  /api/v1/recipes/purchased/
POST /api/v1/recipes/<recipe_id>/like-toggle/

GET /api/v1/cart/

POST /api/v1/cart/items/
    {"items": [{
        "product_id": 9329, "quantity": 2,
        "product_id": 15163, "quantity": -1
    }]}

POST /api/v1/cart/clear/
*/


let options = {
    host: 'kolonial.no',
    port: 443,
    path: "",
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "User-Agent": config.secretusername,
        "X-Client-Token": config.secrettoken
    }
};


module.exports = {

  kolonialRecipes: function(search, callback){

    options.path = recipeSearchPath + search;

    request.kolonialAPIRequest(options, function(list){

      callback(list);

    });

  },

  kolonialSearch: function(search, callback){

    options.path = searchPath + search;

    request.kolonialAPIRequest(options, function(list){

      callback(list);

    });

  }
};
