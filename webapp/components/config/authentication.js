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
	//console.log(req.cookies.requestPath);
	if (!req.cookies.data || !req.cookies.data.is_authenticated === "undefined" || req.cookies.data.is_authenticated === false) {
		let data = { "noe": "for morro skyld" };

    // Her er brukeren ikke autentisert
    res.cookie("data", data);
    // TODO: Om bruker ikke er logget inn, og har en id som vi har gitt, så er det bra. 
    //if(req.cookies.data.planleggerId && Number.isInteger(req.cookies.data.planleggerId)
    
    // TODO: Om bruker ikke er logget inn, og ikke har en id som vi har gitt, så gi en id. 
    /*
    else { 
    
      req.cookies.data.planleggerId = query.createuser....(then{return planleggerId}})
    
    */ 
    


	
		res.locals.signedin = false;
	}
	else {
    // Her er brukeren autentisert

    /*
     *  Om bruker er logget inn, og ikke har en K-planlegger-ID, gi personen en k-planlegger-id og knytt den opp til kolonial.no-id
     
     if(!req.cookies.data.planleggerId === 'undefined' || !req.cookies.data.planleggerId){
¨
      req.cookies.data.planleggerId = query.createuser....(then{return planleggerId}})

      query.fetch().where kolonialId =  planleggerId, 


     }
     
     
     Om bruker er logget inn, og har en K-planlegger-id, Ikke gjør noe. 
     
     if()
     
    */
    



		res.locals.signedin = true;
    
    
  }

  /*

  if (!req.cookies.data.ukeId || !req.cookies.data.ukeId === 'undefined'){

    req.cookies.data.ukeId = query.createweekID(req.cookies.data.planleggerId).then();

  }
    */
	next();
};
