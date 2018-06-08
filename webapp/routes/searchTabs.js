const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");

router.get("/", function (req, res) {
  let search = "";
  let data = "";
  let cat = "";
  let dayid = req.param("dayid");

  

    
  res.render("searchTabs", {
    title: "K-Planleggeren",
    search: search,
    data: data,
    categories: cat, 
    dayid: dayid
  });
});


module.exports = router;
