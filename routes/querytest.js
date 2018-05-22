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

  query.addMealToDayQuery(userInput, "Dinner", 4, 1, 1);

  res.render("querytest", {
    title: "K-Planleggeren",
    returnData: userInput
  });
});

module.exports = router;
