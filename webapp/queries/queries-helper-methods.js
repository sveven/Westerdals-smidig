const connection = require("../components/kolonialapi/requestHandler");

module.exports = {
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
