const express = require('express');
const router = express.Router();
const connection = require('../components/kolonialapi/requestHandler');


/* GET home page. */
router.get('/', function(req, res, next) {

  let search = "ost";

  connection.searchForRecipe(search, function(list){

    console.log(list);

  });

});

module.exports = router;
