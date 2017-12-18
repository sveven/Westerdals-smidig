function start() {
    if (window.XMLHttpRequest) {
        var xmlhttp = new XMLHttpRequest();
    } else {
        var xmlhttp = false;
    }
}

observeEvent(window, "load", function() {
    var btnSearch = document.getElementById("btn-search");
    observeEvent(btn, "click", start);
});