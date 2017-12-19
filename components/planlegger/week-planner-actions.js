const fs = require('fs');

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

function getAllItemsInRecipe(recipeID) {
    
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

    testingFunction: function(jsonFile) {
        getAllRecipeIDsFromAllMeals(jsonFile);
    }


};