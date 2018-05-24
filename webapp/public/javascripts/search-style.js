//Variables

//HTML objects

let searchResult;
let searchBtn;

const init = function () {
	const setElements = function () {
		searchResult = $(".search-result");
		searchBtn = $("#grocery-search-btn");
	}();

	const setEvents = function () {
		searchBtn.click(function () {
			searchResult.toggle();
			searchResult.fadeIn(1200);
			

		});
	}();
}();