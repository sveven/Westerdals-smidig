const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");

router.get("/", function(req, res) {
  let search = "";
  let data = "";

  res.render("searchTabs", {
    title: "K-Planleggeren",
    search: search,
    data: data
  });
});
module.exports = router;
