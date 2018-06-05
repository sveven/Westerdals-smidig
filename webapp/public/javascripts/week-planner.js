(function ($) {
	//variables
	let getClickedID;

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

	function appendMealToPlanner() {
		let checkData = inputData;
		if (getClickedID == Object.keys(checkData)) {
			for (i in Meals[i]) {
				let mealUL = $("<ul class='meal-ul'>");
				let mealTitle = $("<p class='meal-title'>" + Meals[i].Title + "</p>");
				let mealImage = $("<img class='meal-img img-thumb img-thumbnail img-fluid' src='" + Meals[i].Image + "'" + "/>");
			}
			for (i in Products[i].indentifier) {
				let groceryUL = $("<ul class='grocery-ul'>")
				let groceryTitle = $("<p class='grocery-title'>" + Products[i].identifier.Title + "</p>");
				let groceryImage = $("<img class='meal-img img-thumb img-thumbnail img-fluid' src='" + Products[i].identifier.Image + "'" + "/>");
				let groceryPrice = $("<p class='grocery-price'>" + "Kr " + Products[i].identifier.Price + ",-" + "</p>");
			}
		}
	}

})(jQuery);