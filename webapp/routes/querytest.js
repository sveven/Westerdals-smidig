const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const create = require("../queries/plannerCreateQueries");
const fetch = require("../queries/plannerFetchQueries");
const destroy = require("../queries/plannerDeleteQueries");

router.get("/", function(req, res) {

fetch.fetchUserByKolonialId(353117).then(res=> {
  console.log(JSON.stringify(res));
}).catch(err=> {
  console.log("err",err);
  
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
