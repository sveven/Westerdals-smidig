var https = require('https');
var config = require('../../config');


/*
    This is supposed to a dynamic connection to the
    kolonial.no api. Sould return a connection or
    just the json file?
*/
let list;



exports.jsonResponse = function (search) {



  let options = {
    host: 'kolonial.no',
    port: 443,
    path: '/api/v1/search/?q=' + search,
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "User-Agent": config.secretusername,
        "X-Client-Token": config.secrettoken
      }
  };

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    let chunks = [];

  // Datachunks sent back is incrementally pushed into an array.
    res.on('data', (d) => {
      chunks.push(d);
    });

  // Piece together chunks in array and parse.
    res.on('end', () => {
      let data = Buffer.concat(chunks);
      list = JSON.parse(data);
      return list;
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.end();

};






/*
module.exports.jsonResponse = (search) => {
  return {

  }
}
*/
