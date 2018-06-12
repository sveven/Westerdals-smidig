const connection = require("../components/kolonialapi/requestHandler");

module.exports = {
  getInformationFromRecipe(recipeId) {
    return new Promise(function(resolve, reject) {
      connection.getRecipeById(recipeId, (recipe, err) => {
        if (err) {
          reject(err);
        } else {
          
          resolve(recipe);
        }
      });
    });
  },

  getInformationOfProduct(productId) {
    return new Promise(function(resolve, reject) {
      connection.getExtendedInformationAboutSpecificProduct(
        productId,
        (product, err) => {
          if (err) {
            reject(err);
          } else {
            resolve(product);
          }
        }
      );
    });
  },

  getAllIngredientsFromRecipe(recipeId) {
    return new Promise(function(resolve, reject) {
      connection.getRecipeById(recipeId, (recipe, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(recipe.ingredients);
        }
      });
    });
  },

  /**
   * Returns the default number of portions in a recipe
   * @param {*} recipeId
   */
  getDefaultPortionOfRecipe(recipeId) {
    return new Promise(function(resolve, reject) {
      connection.getRecipeById(recipeId, (recipe, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(recipe.default_num_portions);
        }
      });
    });
  },

  getAllIngredientIdsFromRecipe(recipeId) {
    let ingredientIds = [];

    return new Promise(resolve => {
      this.getAllIngredientsFromRecipe(recipeId)
        .then(res => {
          for (let i in res) {
            ingredientIds.push(res[i].product.id);
          }
          resolve(ingredientIds);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  getPortionQuantityOfIngredientInRecipe(recipeId, ingredientId) {
    let ingredientQuantity;
    return new Promise(resolve => {
      this.getAllIngredientsFromRecipe(recipeId)
        .then(res => {
          for (let i in res) {
            if (res[i].product.id === ingredientId) {
              ingredientQuantity = res[i].portion_quantity;
            }
          }
          resolve(ingredientQuantity);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
