(function($)    {
    'use strict';

    //HTML elements

    var $btnSearch = $('#btn-search');
    var $searchOutput = $('#search-output');
    var $framework;
    var $message = $('.message');

    $btnSearch.on('click', function(e)  {
        var $searchField = $('#field-search').val();
       
        //Prevent default behaviour
        e.preventDefault();
        
        //Ajax request
        $.ajax({
            //location
            url: '/search',
            type: 'POST',
            cache: 'false',
            data: {formSearch: $searchField, ajax: "true"}
        }).done(successFunction)
            .fail(failFunction);
    });

    //successFunction
    function successFunction(data)  {
       
        //if data exists
        alert(JSON.stringify(data));
            for (i in data.products)   {
                alert(JSON.stringify(data.products[i].name));
                /*
                let p = $("<p></p>").text("lol");
                console.log(p);
                
                $("#search-item").after(p);
                */
                
                
                $(".content .search-result").append('<li id="search-item" <a href="itemurl"></li>')
                let img = data.products[i].images[0].thumbnail.url;
                let itemName = $("<p></p>").text(data.products[i].name)
                let itemPrice = $("<p></p>").text(data.products[i].gross_price)
                $('#search-item').prepend('<img class="img-thumb img-thumbnail img-fluid" src="' + img + '\"');
                $("#search-item").after(itemName, itemPrice);
            }   
        
    }

    function failFunction(request, textStatus, errorThrown) {
        // hide the list and show the corresponding message
        $list.hide();
        $message.text('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
      }
})(jQuery);