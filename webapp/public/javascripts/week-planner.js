(function ($) {
	//variables
	let getClickedID;
	let week;

	$(".dinner-wrapper, .lunch-wrapper, .breakfast-wrapper").on("click", "div", function () {
		getClickedID = this.id;
		let type = this.id.substring(0, this.id.indexOf("-"));
		let day = this.id.substring(this.id.indexOf("-") + 1, this.id.length);
	});

	// {"Breakfast-Monday":
	// {"Meals":[{"Title":1,
	// "Image":"imageurl",
	// "recipeId":2456}],
	// "Products":[{"identifier": 
	// {"Title":"Navnet på varen", 
	// "Image": "Imageurl", 
	// "Price":23}}]}
	// }

			
	const init = function() {
		appendMealToPlanner();		
	}();

	function appendMealToPlanner() {
		let checkData = week;
		console.log(week);
		
		if (getClickedID == checkData) {

			for (i in Meals[i]) {
				let mealUL = $("<ul class='meal-ul'>");
				let mealTitle = $("<p class='meal-title'>" + week.Meals[i].Title + "</p>");
				let mealImage = $("<img class='meal-img img-thumb img-thumbnail img-fluid' src='" + week.Meals[i].Image + "'" + "/>");
			}
			for (i in Products[i].indentifier) {
				let groceryUL = $("<ul class='grocery-ul'>")
				let groceryTitle = $("<p class='grocery-title'>" + Products[i].identifier.Title + "</p>");
				let groceryImage = $("<img class='meal-img img-thumb img-thumbnail img-fluid' src='" + week.Products[i].identifier.Image + "'" + "/>");
				let groceryPrice = $("<p class='grocery-price'>" + "Kr " + Products[i].identifier.Price + ",-" + "</p>");
			}
		} 
	 }
	

})(jQuery);