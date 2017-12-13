const express = require('express');
const router = express.Router();
const connection = require('../components/kolonialapi/connection');


/* GET search page. */
router.get('/', function(req, res) {
    let search = "";
    let list = [];

    res.render('recipes', {
        title: 'K-Planleggeren',
        search: search,
        data: list});

});


router.post('/', function(req, res){
    let search = req.body.formsearch;
    
    connection.kolonialRecipes(search, function(list){

        res.render('recipes', {
            title: 'K-Planleggeren',
            search: search,
            data: list});

    })
});

module.exports = router;
