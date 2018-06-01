const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");

router.get("/", function(req, res) {
  let search = "";
  let data = "";
  let cat = "";

  res.render("searchTabs", {
    title: "K-Planleggeren",
    search: search,
	data: data,
	categories: cat
  });
});
module.exports = router;
