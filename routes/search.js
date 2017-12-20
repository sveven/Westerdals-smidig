

const express = require("express");
const router = express.Router();
const connection = require("../components/kolonialapi/requestHandler");


/* GET search page. */
router.get("/", function(req, res) {


	let search = "";
	let list;

	res.render("search", {
		title: "K-Planleggeren",
		search: search,
		data: list});

});


router.post("/", function(req, res){
	let search = req.body.formsearch;
	let ajax = req.body.ajax;

	connection.searchForProduct(search, function(list){


		if(ajax === "true"){
			let data = list;
			res.send(data);


		} else {
			res.render("search", {
				title: "K-Planleggeren",
				search: search,
				data: list});

		}
	});


/*
    let options = {
        host: 'kolonial.no',
        port: 443,
        path: '/api/v1/search/?q=' + search,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "User-Agent": config.secretusername,
            "X-Client-Token": config.secrettoken
        }
    };
*/

	/*
      API
    */
/*
    const apireq = https.get(options, (apires) =>{
        //console.log('statusCode', apires.statusCode);
        //console.log('headers:', apires.headers);
        //console.log("API:" + search);

        let chunks = [];

// Datachunks sent back is incrementally pushed into an array.
        apires.on('data', (d) => {
            chunks.push(d);
        });
// Piece together chunks in array and parse.

  apires.on('end', () => {
    let data = Buffer.concat(chunks);
    list = JSON.parse(data);
    //console.log(list);

    //res.send(data);

    res.render('search', {
      title: 'K-Planleggeren',
      search: req.body.formsearch,
      data: list});

  });
});

apireq.on('error', (e) => {
  console.error(e);
});

apireq.end();
*/


});




module.exports = router;
