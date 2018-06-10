const plannerModal = (function () {
	"use strict";


	//HTML Objects
	let mealsDiv = $(".meals");
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



	const init = (function()	{
		$(".breakfast, .lunch, .dinner").on("click", "div .see-more-icon", function()	{
			console.log("lol");
			let elementId = this.parents("div").parents("div").id;
			
		})
	})();

	function appendModal()	{
		plannerModal = $("<div>", {
			class: "modal fade planner-modal",
			id: "ModalCenter",
			tabindex: "-1",
			role: "dialog",
			"aria-labelledby": "exampleModalCenterTitle",
			"aria-hidden": "true"
		});

		modalDialog = $("<div>", {
			class: "modal-dialog modal-dialog-centered",
			role: "document",
		});

		modalContent = $("<div>",	{
			class: "modal-content"
		});

		modalHeader = $("<div>",	{
			class: "modal-header"
		});
		modalTitle = $("<h5>",	{
			class: "modal-title",
			id: "exampleModalLongTitle",
			text: "Dag"
		});
		modalHeaderBtn = $("<button>",	{
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

		modalMeals = $("<div>",	{
			class: "modal-meals"
		});
		productAmount = $("<h3>",	{
			class: "modal-recipe-main-title",
			text: "oppskrifter: "
		});
		mealWrapper = $("<div>",	{
			class: "modal-meal-wrapper"
		});
		plannerMealImg = $("<img>",	{
			class: "recipe-planner-meal-image",
			src: "",
		});
		mealRemoveIcon = $("<i>",	{
			class: "far fa-time-circle"
		});
		mealTitle = $("<p>",	{
			class: "recipe-planner-meal-title",
			text: ""
		});


		modalProducts = $("<div>",	{
			class: "modal-products"
		});
		productAmount = $("<h3>",	{
			class: "modal-product-main-title",
			text: ""
		});

		productWrapper = $("<div>",	{
			class: "product-wrapper"
		});
		productImage = $("<img>", {
			class: "planner-product-image",
			src: "",
		});

		productRemoveBtn = $("<i>",	{
			class: "modal-remove-icon far fa-times-circle"
		});
		productTitle = $("<p>",	{
			class: "planner-product-title",
			text: ""
		});
		productPrice = $("<p>",	{
			class: "planner-product-price",
			text: ""
		});

		modalFooter = $("<div>",	{
			class: "modal-footer"
		});
		closeModalBtn = $("<button>",	{
			type: "button",
			class: "btn btn-primary",
			"data-dismiss": "modal",
			text: "Ok"
		});
		modalFooter.append(closeModalBtn);
		mealWrapper.append(plannerMealImg, mealRemoveIcon, mealTitle);
		modalMeals.append(mealsAmount, mealWrapper);
		productWrapper.append(productImage, productRemoveBtn, productTitle, productPrice);
		modalProducts.append(productAmount, productWrapper);
		modalBody.append(modalMeals, modalProducts);
		modalHeaderBtn.append(headerBtnSpan);
		modalHeader.append(modalTitle, modalHeaderBtn);
		modalContent.append(modalHeader, modalBody, modalFooter);
		modalDialog.append(modalContent);
		plannerModal.append(modalDialog);
		mealsDiv.append(plannerModal);
	}
})(jQuery);