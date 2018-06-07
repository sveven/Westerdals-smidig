const query = require("../../queries/plannerCreateQueries");

module.exports = function(req, res, next) {
	let path = req.path;


  /**
   *  Middleware
   * 
   *  Her sjekker vi cookies og passer på at variablene der eksisterer og er oppdatert. 
   *  Når en bruker logger inn, skal den temporære id'en knyttes til kundeId fra Kolonial.no
   * 
   */



	res.cookie("requestPath", path);

	if (!req.cookies.data || !req.cookies.data.is_authenticated === 'undefined' || req.cookies.data.is_authenticated === false) {

    let data = {};

    res.cookie("data", data);
	
		res.locals.signedin = false;
  }
  
	else {
    // Her er brukeren autentisert
		res.locals.signedin = true;
  }
    
	next();
};
