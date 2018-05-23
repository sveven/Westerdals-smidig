const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const query = require("../queries/planner-queries");

router.get("/", function(req, res) {
  res.render("querytest", {
    title: "K-Planleggeren",
    returnData: ""
  });
});

router.post("/", function(req, res) {
  let userInput = req.body.formfield;
  
  query.addMealToDayQuery(userInput, "Dinner", 4, 1);

  query.createProductQuery(userInput);
  
  query.fetchProductQuery( function(fetchResponse){
    req.allProducts = pullProductInfo(fetchResponse);

    renderQueryTestPage(req, res)
   });
  
});

function renderQueryTestPage(req, res) {
  res.render("querytest", {
    title: "K-Planleggeren",
    allProducts: req.allProducts
  });
  
};


function pullProductInfo(raw){
  let productInfo = JSON.parse(raw);



  return productInfo;

}

module.exports = router;
