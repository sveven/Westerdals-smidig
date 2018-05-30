const searchOptions	= (function($)	{
	"use strict";

	//HTML Objects
	let groceriesBtn;
	let recipesBtn;
	let body;

	//init
	const init = (function()	{
		const setHTMLObjects = (function () { 
			groceriesBtn = $("#groceries-btn-wrapper");
			recipesBtn = $("#recipe-btn-wrapper");
			body = $("#body-section");
		})();
		const setEvents = (function() {
			groceriesBtn.on("click", "label", function (e) { 

				e.preventDefault();

				$.ajax({
					url: "/search",
					type: "GET",
					success: function (result) {
						body.html(result);
						
					}
				});
			});
			recipesBtn.on("click", "label", function (e) { 
				
				e.preventDefault();

				$.ajax({
					url: "/recipes",
					type: "GET",
					success: function (result) {
						body.html(result);
					}
				});
			});
		})();
	})();
})(jQuery);