const searchOptions = (function($) {
	"use strict";

	//HTML Objects
	let groceriesBtn;
	let recipesBtn;
	let searchChoice;

	//init
	const init = (function() {
		const setHTMLObjects = (function() {
			groceriesBtn = $("#groceries-btn-wrapper");
			recipesBtn = $("#recipe-btn-wrapper");
			searchChoice = $("#search-location");
		})();
		const setEvents = (function() {
			groceriesBtn.on("click", "label", function(e) {
				e.preventDefault();

				$.ajax({
					url: "/search/partial",
					type: "GET",
					success: function(result) {
						searchChoice.html(result);
					}
				});
			});
			recipesBtn.on("click", "label", function(e) {
				e.preventDefault();

				$.ajax({
					url: "/recipes/partial",
					type: "GET",
					success: function(result) {
						searchChoice.html(result);
					}
				});
			});
		})();
	})();
})(jQuery);
