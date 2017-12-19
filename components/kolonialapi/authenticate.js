const config = require('../../config');
const request = require('request');

module.exports = {

  authenticate: function(req, apicallback){

    const options = {
        uri: 'https://kolonial.no/api/v1/user/login/',
        port: 443,
        form: { 'username': req.body.username,
                'password': req.body.pass
              },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': config.secretusername,
            'X-Client-Token': config.secrettoken
        }
    };

    let token, res;

    function callback(error, response, body){
      //console.log('error:', error);
      //console.log('statusCode:', response && response.statusCode);
      //console.log('body:', body);

      if(!error && response.statusCode == 200){
        let data = JSON.parse(body);

        apicallback(data);
      }

    }

    request.post(options, callback);

  },

  logout: function(req, apicallback){

    const options = {
        uri: 'https://kolonial.no/api/v1/user/logout/',
        port: 443,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': config.secretusername,
            'X-Client-Token': config.secrettoken,
            'Cookie': `sessionid=${req.body.sessionid}`
        }
    };

    let token, res;

    function callback(error, response, body){
      //console.log('error:', error);
      //console.log('statusCode:', response && response.statusCode);
      //console.log('body:', body);

      if(!error && response.statusCode == 200){
        let data = JSON.parse(body);

        apicallback(data);
      }

    }

    request.post(options, callback);

  }
}
