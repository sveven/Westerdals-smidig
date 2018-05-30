(function ($) {
	"use strict";

	//HTML elements
	let $btnSearch = $("#search");
	let $searchOutput = $("#search-output");
	let $framework;
	let $message = $(".message");
	let searchResult = $(".search-result");
	let searchBtn = $("#search");



	$btnSearch.on("click", function (e) {
		let $searchField = $("#grocery-search").val();
		$(".search-result").empty();

		//Prevent default behaviour
		e.preventDefault();

		//Ajax request
		$.ajax({
			//location
			url: "/search",
			type: "POST",
			contentType: "application/json",
			dataType: "json",
			cache: "false",
			data: JSON.stringify({
				formsearch: $searchField,
				ajax: "true"
			})
		}).done(successFunction)
			.fail(failFunction);
	});

	//successFunction
	function successFunction(returnData) {

		let data = returnData;
		let dataLength = data.products.length;
		//if data exists
		if (isEmpty($(".search-result"))) {
			for (var i = 0; i < dataLength; i++) {
				
				$(".content .search-result").append("<li class=\"search-item\" data-toggle='modal' data-target='#exampleModalCenter' id=\"search-item" + i + "\" <a href=\"itemurl\"></li>");
				let buyButton = $("<input class='buy-button' type='submit' value='Kjøp' onclick='"+ data.products[i].id + "'>");
				let imgUrl = data.products[i].images[0].thumbnail.url;
				var $image = $("<img class='img-thumb img-thumbnail img-fluid' src='" + imgUrl + "'" + "/>");
				let itemName = $("<p id='item-name'></p>").text(data.products[i].name);
				let itemNameExtra = $("<p id='item-name-extra'></p>").text(data.products[i].name_extra);
				let itemPrice = $("<p id='item-price'> </p>").text("kr " + data.products[i].gross_price);
				let itemGrossPrice = $("<p id='item-gross-price'> </p>").text("kr " + data.products[i].gross_unit_price + " per " + data.products[i].unit_price_quantity_abbreviation);
				let imgContainer = $("<div class\"img-container\"></div>");
				imgContainer.append($image, buyButton);
				$("#search-item" + i).prepend(itemName, itemNameExtra, itemPrice, itemGrossPrice, imgContainer);
				
			}
		} else {
			return false;
		}
	}

	//error-message
	function failFunction(request, textStatus, errorThrown) {
		// hide the list and show the corresponding message
		$message.text("An error occurred during your request: " + request.status + " " + textStatus + " " + errorThrown);
	}
	//Checks to see if an element is empty
	function isEmpty(el) {
		return !$.trim(el.html());
	}
	
	const setEvents = function () {
		searchBtn.click(function () {
			searchResult.toggle();
			searchResult.fadeIn(1200);
				
	
		});
	}();
	
})(jQuery);