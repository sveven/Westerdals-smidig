
(function ($) {
	//variables
	let getClickedID;
	let week;

	$(".dinner-wrapper, .lunch-wrapper, .breakfast-wrapper").on("click", "div", function () {
		getClickedID = this.id;
		console.log(getClickedID);
		
		let type = this.id.substring(0, this.id.indexOf("-"));
		let day = this.id.substring(this.id.indexOf("-") + 1, this.id.length);
		$("#" + getClickedID).children("form").children("input").val(getClickedID);
	});

})(jQuery);