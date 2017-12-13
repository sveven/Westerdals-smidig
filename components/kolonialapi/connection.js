
var config = require('../../config');
var request = require('./request.js');


/*
    This is supposed to a dynamic connection to the
    kolonial.no api. Sould return a connection or
    just the json file?
*/
const searchPath = '/api/v1/search/?q=';
const recipeSearchPath = '/api/v1/search/recipes/?q=';

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
