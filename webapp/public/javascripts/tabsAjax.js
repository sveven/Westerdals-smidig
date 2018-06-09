const searchOptions = (function($) {
	"use strict";

	//HTML Objects

	//TABS
	let groceriesBtn;
	let recipesBtn;
	let searchChoice;

	//Groceries
	let $btnSearch = $("#search");
	let $searchOutput = $("#search-output");
	let $framework;
	let $message = $(".message");
	let searchResult = $(".search-result");

	//Recipes
	let recipeWrapper = $("recipe-result-wrapper");
	let singleRecipeDayId = $(".single-recipe-dayid");
	let singleRecipeId = $(".single-recipe-id");
	let singleRecipeAdd = $(".single-recipe-add");
	let singleRecipeToRecipes = $("#lol123");
	let backToSearch = $("#back-to-search-btn");

	//init
	const init = (function() {
		const setHTMLObjects = (function() {
			groceriesBtn = $("#groceries-btn-wrapper");
			recipesBtn = $("#recipe-btn-wrapper");
			searchChoice = $("#search-location");
		})();
		const setEvents = (function() {
			singleRecipeAdd.on("click", function() {
				let addDayId = getQueryVariable("dayid");
				singleRecipeDayId.val(addDayId);
			});

			singleRecipeToRecipes.on("click", function() {
				let addDayId = getQueryVariable("dayid");
        singleRecipeToRecipes.attr("href", "/searchTabs?dayid=" + addDayId);
        
      
			});

			backToSearch.on("click", function() {
				let addDayId = getQueryVariable("dayid");
				$("#back-to-search-link").attr("href", "/searchTabs?dayid=" + addDayId);
			});

			/*$(document).keydown(function (event) {
				alert("You pressed " + event.keyCode);
				event.preventDefault();
			}); */
			groceriesBtn.on("click", "label", function(e) {
				e.preventDefault();
				getGrocerySearch();
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

			$("#search-location").on(
				"click",
				"section #search-form #recipe-search-icon",
				function(e) {
					e.preventDefault();
					recipeSearch();
				}
			);

			$("#search-location").on(
				"keyup",
				"#search-header #search-form #recipe-search-text",
				function(e) {
					e.preventDefault();
					if (event.keyCode === 13) {
						recipeSearch();
					}
				}
			);

			$("#search-location").on("click", "div div div #search-icon", function(
				e
			) {
				//Prevent default behaviour
				e.preventDefault();
				grocerySearch();
			});

			$("#search-location").on("keyup", "div div div #grocery-search", function(
				e
			) {
				e.preventDefault();
				if (event.keyCode === 13) {
					grocerySearch();
				}
			});

			$btnSearch.click(function() {
				searchResult.toggle();
				searchResult.fadeIn(1200);
			});
		})();

		const setAppGUI = (function() {
      getGrocerySearch();
		})();
	})();

	function successFunction(returnData) {
		let data = returnData;
		let dataLength = data.products.length;

		let dayIdString = getQueryVariable("dayid");

		//if data exists
		if (isEmpty($(".search-result"))) {
			for (var i = 0; i < dataLength; i++) {
				$(".content .search-result").append(
					"<li class=\"search-item\"  id=\"search-item" +
						i +
						"\" <a href=\"itemurl\"></li>"
				);

				let buyForm = $("<form>", {
					class: "buy-form",
					method: "GET",
					action: "/database/product-in-day/"
				});
				let itemId = $("<input>", {
					type: "hidden",
					name: "productid",
					value: data.products[i].id
				});
				let dayID = $("<input>", {
					type: "hidden",
					name: "dayid",
					value: dayIdString
				});
				let buyButton = $(
					"<input class='buy-button' type='submit' value='Legg til'>"
				);
				let imgUrl = data.products[i].images[0].thumbnail.url;
				var $image = $(
					"<img class='img-thumb img-thumbnail img-fluid' data-toggle='modal' data-target='#exampleModalCenter' src='" +
						imgUrl +
						"'" +
						"/>"
				);
				let itemName = $(
					"<p id='item-name' data-toggle='modal' data-target='#exampleModalCenter'></p>"
				).text(data.products[i].name);
				let itemNameExtra = $(
					"<p id='item-name-extra' data-toggle='modal' data-target='#exampleModalCenter'></p>"
				).text(data.products[i].name_extra);
				let itemPrice = $(
					"<p id='item-price' data-toggle='modal' data-target='#exampleModalCenter'> </p>"
				).text("kr " + data.products[i].gross_price);
				let itemGrossPrice = $(
					"<p id='item-gross-price' data-toggle='modal' data-target='#exampleModalCenter'> </p>"
				).text(
					"kr " +
						data.products[i].gross_unit_price +
						" per " +
						data.products[i].unit_price_quantity_abbreviation
				);
				let imgContainer = $(
					"<div class\"img-container\" data-toggle='modal' data-target='#exampleModalCenter'></div>"
				);
				buyForm.append(itemId, dayID, buyButton);

				$("#search-item" + i).append(
					imgContainer,
					buyForm,
					itemName,
					itemNameExtra,
					itemPrice,
					itemGrossPrice
				);
				imgContainer.append($image);
			}
		} else {
			return false;
		}
	}

	function failFunction(request, textStatus, errorThrown) {
		// hide the list and show the corresponding message
		$message.text(
			"An error occurred during your request: " +
				request.status +
				" " +
				textStatus +
				" " +
				errorThrown
		);
	}
	//Checks to see if an element is empty
	function isEmpty(el) {
		return !$.trim(el.html());
	}

	function getGrocerySearch() {
		$.ajax({
			url: "/search/partial",
			type: "GET",
			success: function(result) {
        searchChoice.html(result);
				$("#groceries-tab").addClass("active");
			}
    });
  }
  
	function grocerySearch() {
		let $searchField = $("#grocery-search").val();
		$(".search-result").empty();
		//Ajax request
		$.ajax({
			//location
			url: "/search",
			type: "POST",
			contentType: "application/json",
			dataType: "json",
			cache: "false",
			data: JSON.stringify({
				formsearch: $searchField
			})
		})
			.done(successFunction)
			.fail(failFunction);
	}

	function recipeSearch() {
		let recipeQuery = $("#recipe-search-text").val();
		$.ajax({
			url: "/recipes",
			type: "POST",
			contentType: "application/json",
			dataType: "json",
			cache: "false",
			data: JSON.stringify({
				recipeQuery: recipeQuery
			}),
			success: appendRecipeResult
		});
	}

	function appendRecipeResult(returnData) {
		let data = returnData;
		let dataLength = data.length;

		let dayIdString = getQueryVariable("dayid");

		let recipeResultWrapper = $(".recipe-result-wrapper");
		let recipeResultSection = $("<section>", {
			id: "recipe-result-section"
		});

		if (data.results) {
			for (let i in data.results) {
				let singleRecipeUrl = "/recipes/single/" + data.results[i].id;

				let recipeWrapper = $("<div>", {
					class: "recipe-wrapper"
				});
				let recipeImg = $("<img>", {
					class: "recipe-img",
					src: data.results[i].feature_image_url
				});

				let recipeTitle = $("<h5>", {
					class: "recipe-title",
					text: data.results[i].title
				});
				let singleRecipeLink = $("<a>", {
					class: "single-recipe-link",
					href: singleRecipeUrl + "?dayid=" + dayIdString
				});
				let recipeDifficulty = $("<p>", {
					class: "recipe-difficulty",
					text: data.results[i].difficulty_string
				});
				let addForm = $("<form>", {
					method: "GET",
					action: "/database/recipe-in-day/"
				});
				let buyButton = $("<input>", {
					class: "buy-button",
					type: "submit",
					value: "Legg til"
				});

				let recipeID = $("<input>", {
					type: "hidden",
					name: "recipeid",
					value: data.results[i].id
				});
				let dayID = $("<input>", {
					type: "hidden",
					name: "dayid",
					value: dayIdString
				});
				let recipeDuration = $("<p>", {
					class: "recipe-duration",
					text: data.results[i].cooking_duration_string
				});

				addForm.append(recipeID, dayID, buyButton);
				singleRecipeLink.append(recipeImg, recipeTitle, recipeDifficulty);
				recipeWrapper.append(singleRecipeLink, addForm, recipeDuration);
				recipeResultWrapper.append(recipeWrapper);
			}
		}
	}

	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return false;
	}
})(jQuery);
