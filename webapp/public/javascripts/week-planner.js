
(function ($) {
	//variables
	let getClickedID;
	let week;

	$(".dinner-wrapper, .lunch-wrapper, .breakfast-wrapper").on("click", ".breakfast, .lunch, .dinner", function () {
		getClickedID = this.id;
		let type = this.id.substring(0, this.id.indexOf("-"));
		let day = this.id.substring(this.id.indexOf("-") + 1, this.id.length);
		$("#" + getClickedID).children("form").children("input").val(getClickedID);
	});

})(jQuery);