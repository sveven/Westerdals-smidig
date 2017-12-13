var https = require('https');
var config = require('../../config');


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

    kolonialAPIRequest(options, function(list){

      callback(list);

    });

  },

  kolonialSearch: function(search, callback){

    options.path = searchPath + search;

    kolonialAPIRequest(options, function(list){

      callback(list);

    });

  }
};

function kolonialAPIRequest(options, apicallback){

  /*
    API
  */

  const req = https.get(options, (res) =>{
      //console.log('statusCode', apires.statusCode);
      //console.log('headers:', apires.headers);
      //console.log("API:" + search);

      let chunks = [];

// Datachunks sent back is incrementally pushed into an array.
      res.on('data', (d) => {
          chunks.push(d);
      });

// Piece together chunks in array and parse.

res.on('end', () => {
  let data = Buffer.concat(chunks);
  let list = JSON.parse(data);

  apicallback(list);

  });
});

req.on('error', (e) => {
console.error(e);
});

req.end();

}
