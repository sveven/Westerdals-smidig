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

			$("#search-location").on(
				"click",
				"section #search-form #recipe-search-icon",
				function(e) {
					e.preventDefault();
					recipeSearch();
				}
			);

			$("#search-location").on("keyup", "#search-header #search-form #recipe-search-text", function(e)	{
				e.preventDefault();
				if (event.keyCode === 13)	{
					recipeSearch();
				}
			} );

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
	})();

	function successFunction(returnData) {
		let data = returnData;
		let dataLength = data.products.length;
		//if data exists
		if (isEmpty($(".search-result"))) {
			for (var i = 0; i < dataLength; i++) {
				$(".content .search-result").append(
					"<li class=\"search-item\" data-toggle='modal' data-target='#exampleModalCenter' id=\"search-item" +
						i +
						"\" <a href=\"itemurl\"></li>"
				);
				let buyButton = $(
					"<input class='buy-button' type='submit' value='Kjøp' onclick='" +
						data.products[i].id +
						"'>"
				);
				let imgUrl = data.products[i].images[0].thumbnail.url;
				var $image = $(
					"<img class='img-thumb img-thumbnail img-fluid' src='" +
						imgUrl +
						"'" +
						"/>"
				);
				let itemName = $("<p id='item-name'></p>").text(data.products[i].name);
				let itemNameExtra = $("<p id='item-name-extra'></p>").text(
					data.products[i].name_extra
				);
				let itemPrice = $("<p id='item-price'> </p>").text(
					"kr " + data.products[i].gross_price
				);
				let itemGrossPrice = $("<p id='item-gross-price'> </p>").text(
					"kr " +
						data.products[i].gross_unit_price +
						" per " +
						data.products[i].unit_price_quantity_abbreviation
				);
				let imgContainer = $("<div class\"img-container\"></div>");
				imgContainer.append($image, buyButton);
				$("#search-item" + i).prepend(
					itemName,
					itemNameExtra,
					itemPrice,
					itemGrossPrice,
					imgContainer
				);
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

		let recipeResultWrapper = $(".recipe-result-wrapper");
		let recipeResultSection = $("<section>", {
			id: "recipe-result-section"
		});

		if (data.results) {
			for (let i in data.results) {
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
				let recipeDifficulty = $("<p>", {
					class: "recipe-difficulty",
					text: data.results[i].difficulty_string
				});
				let addForm = $("<form>");
				let buyButton = $("<input>", {
					class: "buy-button",
					type: "submit",
					value: "Legg til"
				});
				let recipeDuration = $("<p>", {
					class: "recipe-duration",
					text: data.results[i].cooking_duration_string
				});

				addForm.append(buyButton);
				recipeWrapper.append(
					recipeImg,
					recipeTitle,
					recipeDifficulty,
					addForm,
					recipeDuration
				);
				recipeResultWrapper.append(recipeWrapper);
			}
		}
	}
})(jQuery);
