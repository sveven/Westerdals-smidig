const queries = require("./planner-queries");

module.exports = {

    getJsonResultForCart(weekId) {
        let meals = queries.fetchMealsFromWeek(weekId);
        queries.fetchAllProductsInMealWithQuantity();
    }
}