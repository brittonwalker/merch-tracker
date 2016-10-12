$(document).ready(function() {

  $('#merch-form').submit(function(e){
    e.preventDefault();
    var name = $('#name').val();
    var merchId = $(this).attr('data-id');
    var small = $('#small').val();
    var smallQuant = parseInt($('#small-quantity').val());
    var medium = $('#medium').val();
    var mediumQuant = parseInt($('#medium-quantity').val());
    var large = $('#large').val();
    var largeQuant = parseInt($('#large-quantity').val());
    var xlarge = $('#xlarge').val();
    var xlargeQuant = parseInt($('#xlarge-quantity').val());
    var quantity = smallQuant + mediumQuant + largeQuant + xlargeQuant;
    var size = [];
    console.log(quantity);
    size.push(
      { size: 'small', quantity: smallQuant },
      { size: 'medium', quantity: mediumQuant },
      { size: 'large', quantity: largeQuant },
      { size: 'xlarge', quantity: xlargeQuant }
    );
    $.ajax({
      url: 'http://localhost:8080/api/merch/' + merchId.toString(),
      type: 'PUT',
      data: {
        name: name,
        quantity: quantity,
        sizes: size
      },
      dataType: 'json'
    }).done(function(res) {
      console.log(res);
      location.reload();
    }).fail(function(res) {
      console.log("Failed to update.");
      console.log(res);
    });
  });

  $('#show-form').submit(function(e){
    e.preventDefault();
    var date = $('#date').val();
    var merchId = $(this).attr('data-id');
    var venue = $('#venue').val();
    var contact = $('#contact').val();
    var pay = $('#large').val();
    var lat = $('#lat').val();
    var lang = $('#lang').val();
    var city = $('#city').val();
    $.ajax({
      url: 'http://localhost:8080/api/show',
      type: 'POST',
      data: {
        date: date,
        venue: venue,
        contact: contact,
        pay: pay,
        lat: lat,
        lang: lang,
        city: city
      },
      dataType: 'json'
    }).done(function(res) {
      console.log(res);
      location.reload();
    }).fail(function(res) {
      console.log("Failed to update.");
      console.log(res);
    });
  });

  $('#expense-form').submit(function(e){
    e.preventDefault();
    var description = $('#description').val();
    var amount = $('#amount').val();
    $.ajax({
      url: 'http://localhost:8080/api/expense',
      type: 'POST',
      data: {
        description: description,
        amount: amount
      },
      dataType: 'json'
    }).done(function(res) {
      console.log(res);
      // location.reload();
    }).fail(function(res) {
      console.log("Failed to update.");
      console.log(res);
    });
  });

    var map = $('#mapid');
        var mymap = L.map('mapid').setView([27.664827, -81.515754], 5);

        L.tileLayer("http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'brittonwalker.okh8c6b8',
            accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
        }).addTo(mymap);

        mymap.scrollWheelZoom.disable();

        var url2 = 'http://localhost:8080/api/show/';
        var showpage = 'http://localhost:8080/shows/';
        var $showsTable = $('#shows-table');
        $.get(url2, function(data) {
            $.each(data, function(index, value) {
                // var date = new Date(value.date),
                //     day = date.getDate(),
                //     month = date.getMonth() + 1,
                //     year = date.getFullYear();
                // var urlId = showpage + value._id;
                // var displayDate = '<td><a href="' + urlId + '">' + month + '/' + day + '/' + year + '</a></td>';
                // var venue = '<td>' + value.venue + '</td>';
                // var contact = '<td>' + value.contact + '</td>';
                // var pay = '<td>' + value.pay + '</td>';
                // var city = '<td>' + value.city + '</td>';
                var lat = value.lat || null;
                var lang = value.lang || null;
                // console.log(urlId);
                L.marker([lat, lang]).addTo(mymap);
                // $showsTable.append('<tr class="' + 'clickable-row' +'" data-href="' + urlId + '">' + urlId + displayDate + '</a>' + city + venue + contact + pay + '</tr>')
            });
        });


    var url = 'http://localhost:8080/api/merch/';
    // var $tbody = $('#merch-table');
    //
    // $.get(url, function(data) {
    //     $.each(data, function(index, value) {
    //         var urlId = '<a href="' + url + value._id + '">';
    //         $tbody.append('<tr><td>' + urlId + value.name + '</a></td>><td>' + value.quantity + '</td></tr>')
    //     });
    // })

    var showId = $( '#show-id' );
    if(showId > 0){
      var showurl = url2 + '/' + $( '#show-id' ).val();
      console.log(showurl);
      // $.get(url2)
    }


    // mymap.on('click', function() {
    //     if (mymap.scrollWheelZoom.enabled()) {
    //         mymap.scrollWheelZoom.disable();
    //     } else {
    //         mymap.scrollWheelZoom.enable();
    //     }
    // });
    //
    var bullshit = console.log('sum bullshit');

});
