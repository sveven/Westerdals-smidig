const plannerModal = (function() {
	"use strict";

	//HTML Objects

	//MODAL ELEMENTS
	let plannerModal;
	let modalDialog;
	let modalContent;
	let modalHeader;
	let modalTitle;
	let modalHeaderBtn;
	let headerBtnSpan;

	let modalBody;
	let modalMeals;
	let mealsAmount;
	let mealWrapper;
	let plannerMealImg;
	let mealRemoveIcon;
	let mealTitle;

	let modalProducts;
	let productAmount;
	let productWrapper;
	let productImage;
	let productRemoveBtn;
	let productTitle;
	let productPrice;
	let modalFooter;
	let closeModalBtn;

	const init = (function() {
		const setEvents = (function() {
			$(".breakfast, .lunch, .dinner").on(
				"click",
				".meals .see-more-icon",
				function() {
					let appendLocation = $(this)
						.closest("div.breakfast")
						.attr("id");

					$.ajax({
						url: "/week-planner-current/all-information/",
						type: "get",
						contentType: "application/json",
						dataType: "json",
						success: function(result) {
							appendModal(appendLocation, result);
							$("#myModal").modal("show");
						}
					});
				}
			);
			$(".breakfast, .lunch, .dinner").on(
				"click",
				"div div div #modal-close-btn",
				function() {
					/* $("#myModal").modal("close"); */
					$("#myModal").remove();
					$(".modal-backdrop").remove();
				}
			);
		})();
	})();

	function appendModal(appendLocation, result) {
		let data = result;

		let appendLocationUpperCase =
			appendLocation.substring(0, 1).toUpperCase() +
			appendLocation.substring(1, appendLocation.indexOf("-")) +
			appendLocation
				.substring(
					appendLocation.indexOf("-") + 1,
					appendLocation.indexOf("-") + 2
				)
				.toUpperCase() +
			appendLocation.substring(
				appendLocation.indexOf("-") + 2,
				appendLocation.length
			);

			console.log(data);
			
		let currentDay = data[appendLocationUpperCase];
		console.log(currentDay);

		plannerModal = $("<div>", {
			class: "modal fade planner-modal",
			id: "myModal",
			"tabindex": "-1",
			"role": "dialog",
			"aria-labelledby": "exampleModalCenterTitle",
			"aria-hidden": "false"
		});

		modalDialog = $("<div>", {
			class: "modal-dialog modal-dialog-centered",
			role: "document"
		});

		modalContent = $("<div>", {
			class: "modal-content"
		});

		modalHeader = $("<div>", {
			class: "modal-header"
		});
		modalTitle = $("<h5>", {
			class: "modal-title",
			id: "exampleModalLongTitle",
			text: "Dag"
		});
		modalHeaderBtn = $("<button>", {
			type: "button",
			class: "close",
			"data-dismiss": "modal",
			"aria-label": "Close"
		});
		headerBtnSpan = $("<span>", {
			"aria-hidden": "true",
			text: "&times;"
		});

		modalBody = $("<div>", {
			class: "modal-body"
		});

		modalMeals = $("<div>", {
			class: "modal-meals"
		});
		productAmount = $("<h3>", {
			class: "modal-recipe-main-title",
			text: "oppskrifter: "
		});
		mealWrapper = $("<div>", {
			class: "modal-meal-wrapper"
		});
		plannerMealImg = $("<img>", {
			class: "recipe-planner-meal-image",
			src: currentDay.Meals[0].Image
		});
		mealRemoveIcon = $("<i>", {
			class: "far fa-time-circle"
		});
		mealTitle = $("<p>", {
			class: "recipe-planner-meal-title",
			text: currentDay.Meals[0].Title
		});

		modalProducts = $("<div>", {
			class: "modal-products"
		});
		productAmount = $("<h3>", {
			class: "modal-product-main-title",
			text: ""
		});

		productWrapper = $("<div>", {
			class: "product-wrapper"
		});
		productImage = $("<img>", {
			class: "planner-product-image",
			src: ""
		});

		productRemoveBtn = $("<i>", {
			class: "modal-remove-icon far fa-times-circle"
		});
		productTitle = $("<p>", {
			class: "planner-product-title",
			text: ""
		});
		productPrice = $("<p>", {
			class: "planner-product-price",
			text: ""
		});

		modalFooter = $("<div>", {
			class: "modal-footer"
		});
		closeModalBtn = $("<button>", {
			type: "button",
			id: "modal-close-btn",
			class: "btn btn-primary",
			"data-dismiss": "modal",
			text: "Ok"
		});
		modalFooter.append(closeModalBtn);
		mealWrapper.append(plannerMealImg, mealRemoveIcon, mealTitle);
		modalMeals.append(mealsAmount, mealWrapper);
		productWrapper.append(
			productImage,
			productRemoveBtn,
			productTitle,
			productPrice
		);
		modalProducts.append(productAmount, productWrapper);
		modalBody.append(modalMeals, modalProducts);
		modalHeaderBtn.append(headerBtnSpan);
		modalHeader.append(modalTitle, modalHeaderBtn);
		modalContent.append(modalHeader, modalBody, modalFooter);
		modalDialog.append(modalContent);
		plannerModal.append(modalDialog);
		$("#" + appendLocation).append(plannerModal);
	}
})(jQuery);
