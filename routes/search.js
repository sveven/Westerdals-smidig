const express = require('express');
const router = express.Router();

let data = "";
let search = "";

/* GET search page. */
router.get('/', function(req, res, next) {

  res.render('search', {
    title: 'K-Planleggeren',
    search: search });
});

router.post('/', function(req, res){
  search = req.body.formsearch;

  console.log("Formsearch: " + search);

  res.render('search', {
    title: 'K-Planleggeren',
    search: search});


});


module.exports = router;
