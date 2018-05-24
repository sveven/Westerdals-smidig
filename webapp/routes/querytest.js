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

  query.fetchMealsFromWeek(1).then(res => console.log(JSON.stringify(res)));

  query.fetchAllProductsQuery().then(products => {
    renderQueryTestPage(products, res);
  });
});

function renderQueryTestPage(products, res) {
  res.render("querytest", {
    title: "K-Planleggeren",
    allProducts: products
  });
}

module.exports = router;
