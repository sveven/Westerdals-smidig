var https = require('https');

module.exports = {

  kolonialAPIRequest: function(options, apicallback){

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
      let list = JSON.parse(data);

      apicallback(list);

      });
    });

  req.on('error', (e) => {
  console.error(e);
  });

  req.end();

  }

}
