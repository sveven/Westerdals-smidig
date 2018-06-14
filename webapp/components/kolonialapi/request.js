const https = require('https');

module.exports = {

  kolonialAPIRequest: function(options, apicallback){

    /*
      API
    */

    const req = https.get(options, (res) =>{

        let chunks = [];

    res.on('data', (d) => {
        chunks.push(d);
    });

    res.on('end', () => {
      let data = Buffer.concat(chunks);
      let list;
      try{
        list = JSON.parse(data);
      }catch(e){
        console.log(e);
        console.log("LIST: " + data);
        list = {};
      }
      
    
      apicallback(list);

      });
    });

  req.on('error', (e) => {
  console.error(e);
  });

  req.end();

  }

}
