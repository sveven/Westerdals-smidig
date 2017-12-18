const express = require('express');
const router = express.Router();
const connection = require('../components/kolonialapi/requestHandler');
const jsonWeek = require('../components/planlegger/week.json');
const cookieParser = require('cookie-parser');


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
        cookieParser.JSONCookies(jsonWeek),
        {maxAge: 900000, httpOnly: true});
    console.log(req.cookies);
});

module.exports = router;
