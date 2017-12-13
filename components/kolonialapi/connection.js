
var config = require('../../config');
var request = require('./request.js');


/*
    This is supposed to a dynamic connection to the
    kolonial.no api. Sould return a connection or
    just the json file?
*/

//Search for products
const search = '/api/v1/search/?q=';

//Search for recipes
const recipeSearch = '/api/v1/search/recipes/?q=';

//Get productcategories
const productCategories = '/api/v1/productcategories/';
//Get products from product category
const productCategoriesId = '/api/v1/productcategories/';

//Get extended info on single product
const productInformation = '/api/v1/productcategories/';

// Get all recipes
const recipes = '/api/v1/recipes/';
// Get recipes by id
const recipeByID = '/api/v1/recipes/';
// Vet ikke helt hva dette er
const recipesCurrentPlan = '/api/v1/recipes/plans/current/';



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

    /**
     * Returns a list of recipes based on search value
     * @param search
     * @param callback
     */
    searchForRecipe: function(search, callback){

        options.path = recipeSearch + search;

        request.kolonialAPIRequest(options, function(list){

            callback(list);

        });

    },

    /**
     * Returns a list of items based on a search value
     * @param search
     * @param callback
     */
    searchForProduct: function(search, callback){

        options.path = search + search;

        request.kolonialAPIRequest(options, function(list){

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

        request.kolonialAPIRequest(options, function (list) {
            callback(list);
        })
    },

    /**
     * Returns all products in a given product category id
     * @param productCategoryId
     * @param callback
     */
    getAllProductsFromCategory: function(productCategoryId, callback) {
        options.path = productCategoriesId + productCategoryId;

        request.kolonialAPIRequest(options, function (list) {
            callback(list);
        })
    },

    getExtendedInformationAboutSpecificProduct: function(productId, callback) {
        options.path = productInformation + productId;
        request.kolonialAPIRequest(options, function (list) {
            callback(list);
        })
    },
    //End of products endpoint

    //start of recipes endpoint

    getAllRecipes: function(callback) {
        options.path = recipes;
        request.kolonialAPIRequest(options, function (list) {
            callback(list);
        })
    },

    getRecipeById: function(recipeId, callback) {
        options.path = recipes + recipeId;
        request.kolonialAPIRequest(options, function (list) {
            callback(list);
        })
    },

    getRecipesFromCurrentPlan: function( callback) {
        options.path = recipesCurrentPlan;
        request.kolonialAPIRequest(options, function (list) {
            callback(list);
        })
    }


};

