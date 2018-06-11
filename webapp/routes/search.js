const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const searchPartial = "../views/partials/searchPartial.ejs";

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

router.get("/partial", function(req, res) {
  let search = "";
  let list;
  let categories;

  connection.getAllProductCategories(function(cat) {
    res.render(searchPartial, {
      search: search,
      data: list,
      categories: cat
    });
  });
});


router.post("categories/ajax/:id", function(req, res) {
  connection.getAllProductsFromCategory(categoriesId, function(
    categoriesItems
  ) {
    let categoriesId = req.params.produktid;
    let data = categoriesItems;

    res.send(data);
  });
});

router.get("/categories/:id", function(req, res) {
  var categoriesId = req.params.id;
  var search = "";
  var cat = "";

  connection.getAllProductsFromCategory(categoriesId, function(
    categoriesItems
  ) {
    res.render("search", {
      title: "K-Planleggeren",
      search: search,
      data: categoriesItems,
      categories: cat
    });
  });
});

router.get("categories/all/:id", function(req, res) {
  var categoriesId = req.params.id;
  var search = "";
  var cat = "";

  connection.getAllProductsFromCategoryWithAllProductsFromChildren(categoriesId, function(categoriesItems) {
    res.render("search", {
      title: "K-Planleggeren",
      search: search,
      data: categoriesItems,
      categories: cat
    });
  });
});

/*
router.post("/", function(req, res) {
	let search = req.body.formsearch;
	let ajax = req.body.ajax;
	connection.searchForProduct(search, function(list) {

    res.send(list);

		
	});
});
*/
router.post("/", function(req, res) {
  let acceptsJSON = req.accepts('json');
  let search = req.body.formsearch;

	connection.searchForProduct(search, function(data) {
		if (acceptsJSON) {
			res.send(data);
		} else {

      // Categories trengs ikke lastes inn her. 
			res.render("search", {
				title: "K-Planleggeren",
				search: search,
        data: data,
        categories: {}
      });
    }
  });
});

module.exports = router;
