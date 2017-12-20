(function ($) {
    'use strict';

    //HTML elements

    var $btnSearch = $('#btn-search');
    var $searchOutput = $('#search-output');
    var $framework;
    var $message = $('.message');

    $btnSearch.on('click', function (e) {
        var $searchField = $('#field-search').val();

        //Prevent default behaviour
        e.preventDefault();

        //Ajax request
        $.ajax({
                //location
                url: '/search',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                cache: 'false',
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
        if (isEmpty($('.search-result'))) {
            for (var i = 0; i < dataLength; i++) {


                $(".content .search-result").append('<li id="search-item' + i + '" <a href="itemurl"></li>')
                let img = data.products[i].images[0].thumbnail.url;
                let itemName = $("<p></p>").text(data.products[i].name)
                let itemPrice = $("<p></p>").text(data.products[i].gross_price)
                $('#search-item' + i).prepend('<img class="img-thumb img-thumbnail img-fluid" src="' + img + '"' + '>');
                $("#search-item" + i).prepend(itemName, itemPrice);

            }
        } else {
            return false;
        }
    }

    function failFunction(request, textStatus, errorThrown) {
        // hide the list and show the corresponding message
        $message.text('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    }

    function isEmpty(el) {
        return !$.trim(el.html())
    }
})(jQuery);