const express = require("express");
const router = express.Router();
const authenticate = require("../components/kolonialapi/authenticate");

/* GET cart page. */
router.get("/", function(req, res) {

  let list;

  // SQL, get all items in week. 
  // authenticate. getItems in week. 

  res.render("cart", {
    title: "K-Planleggeren",
    data: list
    });
  
});


router.post("/", function(req, res){



});



module.exports = router;
