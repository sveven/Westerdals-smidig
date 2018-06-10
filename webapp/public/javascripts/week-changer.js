
(function ($) {
    $(".weekDropdownSelector").on("change", function() {
        //Updates the cookie value.
        Cookies.set("ukeId", this.options[this.selectedIndex].value);
        //Updates the locals value.
        window.location = "week-planner-current"

    })
})(jQuery);