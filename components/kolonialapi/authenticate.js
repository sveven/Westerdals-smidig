var https = require('https');
var config = require('../../config');


let options = {
    host: 'kolonial.no',
    port: 443,
    path: "/api/v1/user/login/",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "User-Agent": config.secretusername,
        "X-Client-Token": config.secrettoken,
        'Cookie': 'sessionid='
    }
};

module.exports = {

  authenticate: function(options, apicallback){

    /*
      API
    */

    const req = https.get(options, (res) =>{

        let chunks = [];

  // Datachunks sent back is incrementally pushed into an array.
    res.on('data', (d) => {
        chunks.push(d);
    });

  // Piece together chunks in array and parse.

    res.on('end', () => {
      let data = Buffer.concat(chunks);
      let token = data.toString('utf8');

      apicallback(token);

      });
    });

  req.on('error', (e) => {
  console.error(e);
  });

  req.end();

  }

}
