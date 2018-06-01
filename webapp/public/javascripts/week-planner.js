(function ($) {

	$(".dinner-wrapper, .lunch-wrapper, .breakfast-wrapper").on("click", "div", function()   {
        alert("LOL");
		let type = this.id.substring(0,this.id.indexOf("-"));
        let day = this.id.substring(this.id.indexOf("-")+1,this.id.length);
        

		/***
     * TODO: insert createDayQuery
     */
	});


})(jQuery);