const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");
const plannerActions = require("../components/planlegger/week-planner-actions");

router.get("/", function(req, res) {
  let search = "";
  let list = [];

  res.render("test", {
    title: "K-Planleggeren",
    search: search,
    data: list
  });
});

router.post("/", function(req, res) {
  runPostRequestAccordingToRadioChoice(
    req.body.apiQueryType,
    req.body.formInput,
    res
  );

  //Rest of it
  let jsonFile = plannerActions.getWeekAsJsonObject(req);

  plannerActions.testingFunction();
});

function runPostRequestAccordingToRadioChoice(radioButton, searchWord, res) {
  switch (radioButton) {
    case "searchRadio":
      connection.searchForProduct(searchWord, function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
    case "recipeRadio":
      connection.searchForRecipe(searchWord, function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
    case "productCategories":
      connection.getAllProductCategories(function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
    case "productCategoriesId":
      connection.getAllProductsFromCategory(searchWord, function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
    case "productInformation":
      connection.getExtendedInformationAboutSpecificProduct(
        searchWord,
        function(list) {
          res.render("test", {
            title: "K-Planleggeren",
            search: searchWord,
            data: list
          });
        }
      );
      break;
    case "recipes":
      connection.getAllRecipes(function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
    case "recipesByID":
      connection.getRecipeById(searchWord, function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
    case "currentPlan":
      connection.getRecipesFromCurrentPlan(function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
    case "userCart":
      connection.getCartContent(function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;

    case "productCategoryChildren":
      connection.getAllProductsFromCategoryWithAllProductsFromChildren(searchWord, function(list) {
        res.render("test", {
          title: "K-Planleggeren",
          search: searchWord,
          data: list
        });
      });
      break;
  }
}

module.exports = router;
