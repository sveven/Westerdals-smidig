const express = require('express');
const router = express.Router();
const connection = require('../components/kolonialapi/requestHandler');


/* GET search page. */
router.get('/', function(req, res) {
    let search = "";
    let list = [];

    res.render('test', {
        title: 'K-Planleggeren',
        search: search,
        data: list
    });

});


router.post('/', function(req, res){
    runPostRequestAccordingToRadioChoice(req.body.apiQueryType, req.body.formInput, res);

});

function runPostRequestAccordingToRadioChoice(radioButton, searchWord, res) {
    switch(radioButton) {
        case "searchRadio":
            connection.searchForProduct(searchWord, function(list){
                res.render('test', {
                    title: 'K-Planleggeren',
                    search: searchWord,
                    data: list});
            });
            break;
        case "recipeRadio":
            break;
        case "productCategories":
            break;
        case "productCategoriesId":
            break;
        case "productInformation":
            break;
        case "recipes":
            break;
        case "userCart":
            break;
    }
}





module.exports = router;
