(function ($) {
	"use strict";

	//HTML elements

	let $btnSearch = $("#grocery-search-btn");
	let $searchOutput = $("#search-output");
	let $framework;
	let $message = $(".message");

	$btnSearch.on("click", function (e) {
		let $searchField = $("#field-search").val();
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
				$(".content .search-result").append("<li class=\"search-item\" id=\"search-item" + i + "\" <a href=\"itemurl\"></li>");
				let imgUrl = data.products[i].images[0].thumbnail.url;
				var $image = $("<img class='img-thumb img-thumbnail img-fluid' src='" + imgUrl + "'" + "/>");
				let itemName = $("<p id='item-name'></p>").text(data.products[i].name);
				let itemPrice = $("<p id='item-price'></p>").text(data.products[i].gross_price);
				let imgContainer = $("<div class\"img-container\"></div>").html($image);
				$("#search-item" + i).prepend(itemName, itemPrice, imgContainer);
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
})(jQuery);