const express = require('express');
const router = express.Router();
const connection = require('../components/kolonialapi/requestHandler');
const cookie = require('../components/storeMealInCookie');

router.get('/', function(req, res) {
    let search = "";
    let list = [];

    res.render('week-planner-current', {
        title: 'K-Planleggeren',
        search: search,
        data: list
    });
});

router.post('/', function (req,res) {
    console.log("####");
    res.cookie('meals',
        {"productId":"1234", "day":"monday", "type":"dinner"}
        ,{ maxAge: 900000, httpOnly: true });
    console.log(req.cookies);
});


/**
 * {
 * meals: [

 * ]
 * }
 */
module.exports = router;
