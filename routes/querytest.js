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
  let fetchData = "";
  
  //query.addMealToWeekQuery("Monday", userInput, "Dinner", 4, 1, 1);

  query.createProductQuery(userInput);
  
  query.fetchProductQuery( function(fetchResponse){
    fetchData = JSON.stringify(fetchResponse);
  });
  
/*
  res.render("querytest", {
    title: "K-Planleggeren",
    returnData: userInput,
    allProducts: fetchData
  });
*/

res.render("querytest", {
  title: "K-Planleggeren",
  returnData: userInput
});
});




module.exports = router;
