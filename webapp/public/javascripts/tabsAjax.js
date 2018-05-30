const searchOptions	= (function($)	{
	"use strict";

	//HTML Objects
	let groceriesBtn;
	let recipesBtn;
	let searchChoice;

	//init
	const init = (function()	{
		const setHTMLObjects = (function () { 
			groceriesBtn = $("#groceries-btn-wrapper");
			recipesBtn = $("#recipe-btn-wrapper");
<<<<<<< HEAD
			searchChoice = $("#search-choice-section");
=======
			body = $("#body-section");
>>>>>>> 1b78fe3f20d5832e9f19b1a985e653f20959b2e6
		})();
		const setEvents = (function() {
			groceriesBtn.on("click", "label", function (e) { 

				e.preventDefault();

				$.ajax({
					url: "/search",
					type: "GET",
					success: function (result) {
<<<<<<< HEAD
						searchChoice.load(result);
=======
						body.html(result);
						
>>>>>>> 1b78fe3f20d5832e9f19b1a985e653f20959b2e6
					}
				});
			});
			recipesBtn.on("click", "label", function (e) { 
				
				e.preventDefault();

				$.ajax({
					url: "/recipes",
					type: "GET",
					success: function (result) {
<<<<<<< HEAD
						searchChoice.load(result);
=======
						body.html(result);
>>>>>>> 1b78fe3f20d5832e9f19b1a985e653f20959b2e6
					}
				});
			});
		})();
	})();
})(jQuery);