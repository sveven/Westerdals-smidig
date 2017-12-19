const express = require('express');
const router = express.Router();
const connection = require('../components/kolonialapi/requestHandler');
const jsonWeek = require('../components/planlegger/week.json');
const plannerActions = require('../components/planlegger/week-planner-actions');
const cookieParser = require('cookie-parser');
const fs = require('fs');


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
    res.cookie("planner",
        JSON.stringify(jsonWeek),
        {maxAge: 900000, httpOnly:true});

    res.render('week-planner-current', {
        title: 'K-Planleggeren',
    });
    plannerActions.writeCookieToJsonFileOnServerSide(req, 1);

});

module.exports = router;