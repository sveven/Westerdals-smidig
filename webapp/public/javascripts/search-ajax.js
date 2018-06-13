(function($) {
  "use strict";

  //HTML elements
  let $btnSearch = $("#search");
  let $searchOutput = $("#search-output");
  let $framework;
  let $message = $(".message");
  let searchResult = $(".search-result");

  $btnSearch.on("click", function(e) {
    let $searchField = $("#grocery-search").val();
    performSearch($searchField);
  });

  //successFunction
  function successFunction(returnData) {
    let data = returnData;
    let dataLength = data.products.length;
    let productId;
    let weekId = Cookies().ukeId;

    //if data exists
    if (isEmpty($(".search-result"))) {
      for (var i = 0; i < dataLength; i++) {
        productId = data.products[i].id;
        let productAddLink = "database/product-in-week/" + productId;
        let buyForm = $("<form>", {
          class: "buy-form",
          method: "GET",
          action: productAddLink
        });

        let buyButton = $(
          "<input class='buy-button' type='submit' value='Legg til'>"
        );

        $(".content .search-result").append(
          '<li class="search-item" id="search-item' +
            i +
            '" <a href="itemurl"></li>'
        );

        let imgUrl = data.products[i].images[0].thumbnail.url;
        var $image = $(
          "<img class='img-thumb img-thumbnail img-fluid' src='" +
            imgUrl +
            "'" +
            "/>"
        );
        let itemName = $("<p id='item-name'></p>").text(data.products[i].name);
        let itemNameExtra = $("<p id='item-name-extra'></p>").text(
          data.products[i].name_extra
        );
        let itemPrice = $("<p id='item-price'> </p>").text(
          "kr " + data.products[i].gross_price
        );
        let itemGrossPrice = $("<p id='item-gross-price'> </p>").text(
          "kr " +
            data.products[i].gross_unit_price +
            " per " +
            data.products[i].unit_price_quantity_abbreviation
        );
        let imgContainer = $('<div class"img-container"></div>');
        buyForm.append(buyButton);
        imgContainer.append($image, buyForm);
        $("#search-item" + i).prepend(
          imgContainer,
          itemName,
          itemNameExtra,
          itemPrice,
          itemGrossPrice
        );
        buyButton.click(function() {
          buyButton.val("Lagt til").css("background-color", "rgb(20, 223, 51)");
        });
      }
    } else {
      return false;
    }
  }

  //error-message
  function failFunction(request, textStatus, errorThrown) {
    // hide the list and show the corresponding message
    $message.text(
      "An error occurred during your request: " +
        request.status +
        " " +
        textStatus +
        " " +
        errorThrown
    );
  }
  //Checks to see if an element is empty
  function isEmpty(el) {
    return !$.trim(el.html());
  }

  const setEvents = (function() {
    $btnSearch.click(function() {
      searchResult.toggle();
      searchResult.fadeIn(1200);
    });
  })();

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  }

  function performSearch($searchField) {
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
        formsearch: $searchField
      })
    })
      .done(successFunction)
      .fail(failFunction);
  }
})(jQuery);
