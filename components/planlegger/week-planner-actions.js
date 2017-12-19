const fs = require('fs');
const connection = require('../../components/kolonialapi/requestHandler');


function getAllDaysFromWeekPlanner(jsonFile) {
    let jsonData = JSON.parse(jsonFile);
    let recipesInWeek = [];

    for(let i = 0; i < jsonData.days.length; i++) {
        recipesInWeek.push(jsonData.days[i]);
    }
    return recipesInWeek;
}

function getAllMealsFromWeek(jsonFile) {
    let jsonDaysWithMeals = getAllDaysFromWeekPlanner(jsonFile);
    let meals = [];

    for(let i = 0; i < jsonDaysWithMeals.length; i++) {
        if(i === 0) {
            meals.push(jsonDaysWithMeals[i].monday);
        }
        else if(i === 1) {
            meals.push(jsonDaysWithMeals[i].tuesday);
        }
        else if(i === 2) {
            meals.push(jsonDaysWithMeals[i].wednesday);
        }
        else if(i === 3) {
            meals.push(jsonDaysWithMeals[i].thursday);
        }
        else if(i === 4) {
            meals.push(jsonDaysWithMeals[i].friday);
        }
        else if(i === 5) {
            meals.push(jsonDaysWithMeals[i].saturday);
        }
        else if(i === 6) {
            meals.push(jsonDaysWithMeals[i].sunday);
        }
    }

    return meals;
}

function getAllRecipeIDsFromAllMeals(jsonFile) {
    let allMealsFromWeek = getAllMealsFromWeek(jsonFile);
    let allRecipeIDs = [];

    for(let i in allMealsFromWeek) {
        for(let j in allMealsFromWeek[i]) {
            allRecipeIDs.push(allMealsFromWeek[i][j].recipeID);
        }
    }

    return allRecipeIDs;
}

//TODO does not work, due to callbck hell, needs to figure out callback function
//TODO possible to use async await, how to is unclear and needs to be checked
function getAllIngredientsFromRecipe(recipeID) {
    let ingredients;
    connection.getRecipeById(recipeID, function(recipe) {
        ingredients = recipe.ingredients;
    });

}

function getAllIngredientIdsFromRecipe(recipeId) {

}


module.exports = {

    getWeekAsJsonObject: function (req) {
        return req.cookies.planner;
    },

    writeCookieToJsonFileOnServerSide: function (jsonFile, userId) {
        let fileName = "./tmp/week-planner/" + userId + ".json";
        fs.writeFile(fileName, JSON.parse(jsonFile), function (err) {
            if (err) {
                return console.log(err);
            }

        })
    },

    testingFunction: function() {
        getAllIngredientIdsFromRecipe(2399);
    }


};