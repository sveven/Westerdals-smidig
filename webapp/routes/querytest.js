const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const create = require("../queries/plannerCreateQueries");
const destroy = require("../queries/plannerDeleteQueries");

router.get("/", function(req, res) {

  create.createDayQuery(1, "Monday", "Lunch").then(res => {
    console.log(JSON.stringify(res));
  });

  res.render("querytest", {
    title: "K-Planleggeren",
    returnData: ""
  });
});

router.post("/", function(req, res) {
  let userInput = req.body.formfield;
});

function renderQueryTestPage(products, res) {
  res.render("querytest", {
    title: "K-Planleggeren",
    allProducts: products
  });
}

module.exports = router;
