const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");

/* GET search page. */
router.get("/", function(req, res) {
  let search = "";
  let list;
  let categories;

  connection.getAllProductCategories(function(cat) {

  res.render("search", {
    title: "K-Planleggeren",
    search: search,
    data: list,
    categories: cat
  });
});
  
});

router.post("/", function(req, res) {
  let search = req.body.formsearch;
  let ajax = req.body.ajax;
  connection.searchForProduct(search, function(list) {
    if (ajax === "true") {
      res.send(list);
    } else {
      res.render("search", {
        title: "K-Planleggeren",
        search: search,
        data: list
      });
    }
  });
});
module.exports = router;
