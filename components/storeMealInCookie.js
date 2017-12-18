let cookieParser = require('cookie-parser');

//Type = breakfast, lunch, dinner
//Day = monday-sunday
//RecipeID = recipeId
function addMealToCookie(res, recipeID, day, type) {

}

function removeMealFromCookie(res, recipeID, day, type) {
    clearCookie('meals');
}

