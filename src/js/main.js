$(document).ready(function() {

    $('#merch-form').submit(function(e) {
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
        size.push({
            size: 'small',
            quantity: smallQuant
        }, {
            size: 'medium',
            quantity: mediumQuant
        }, {
            size: 'large',
            quantity: largeQuant
        }, {
            size: 'xlarge',
            quantity: xlargeQuant
        });
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

    $('#show-form').submit(function(e) {
        e.preventDefault();
        var show = {};
        show.date = $('#date').val();
        show.venue = $('#venue').val();
        show.contact = $('#contact').val();
        show.pay = $('#large').val();
        show.lat = $('#lat').val();
        show.lang = $('#lang').val();
        show.city = $('#city').val();
        show.address = $('#address').val();
        show.merch = [];
        // var date = $('#date').val();
        // var venue = $('#venue').val();
        // var contact = $('#contact').val();
        // var pay = $('#large').val();
        // var lat = $('#lat').val();
        // var lang = $('#lang').val();
        // var city = $('#city').val();
        // var address = $('#address').val();
        // var merch = [];
        $.get('http://localhost:8080/api/merch', function(data){
          $.each(data, function(i, v){
            console.log(show);
            var singleItem = { item: v.name, sold:0 }
            show.merch.push(singleItem);
            return show;
          })
        }).done(function(){
          console.log(show);
          $.ajax({
              url: 'http://localhost:8080/api/show',
              type: 'POST',
              data: show,
              // data: {
              //     date: date,
              //     address: address,
              //     venue: venue,
              //     contact: contact,
              //     pay: pay,
              //     merch: merch,
              //     coords: {
              //         'lat': lat,
              //         'lng': lang
              //     }
              // },
              dataType: 'json'
          }).done(function(res) {
              // location.reload();
          }).fail(function(res) {
              console.log("Failed to update.");
              console.log(res);
          });
        })

    });

    $('#expense-form').submit(function(e) {
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

    $('#single-show-form').submit(function(e) {
        e.preventDefault();
        var showId = $(this).attr('data-id');
        var showUrl = "http://localhost:8080/api/show/" + showId.toString();
        var show;
        var merch = [];
        var oldMerch = [];
        $('.form-group').each(function(){
          var item = $(this).find('input').attr('id');
          var itemValue = $(this).find('input').val();
          if(itemValue === ''){ itemValue = 0; }
          var itemType = $(this).find('input').attr('data-merch-type');
          merch.push({item: item, sold: itemValue});
        });
        $.get(showUrl, function(data){
          var show = data;
          console.log(show);
          $.each(show.merch, function(i, v){ console.log(show); oldMerch.push(v.sold); });
          return show, oldMerch;
        }).done(function(show){
          $.each(merch, function(z, k){ k.sold = parseInt(k.sold) + parseInt(oldMerch[z]); });
          show.merch = merch;
          $.ajax({
              url: showUrl,
              type: 'PUT',
              data: show,
              dataType: 'json'
          }).done(function(res) {
              // location.reload();
          }).fail(function(res) {
              console.log("Failed to update.");
              console.log(res);
          });
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
            var lat = value.lat || null;
            var lang = value.lang || null;
            L.marker([lat, lang]).addTo(mymap);
        });
    });

    var url = 'http://localhost:8080/api/merch/';

    var showId = $('#show-id');
    if (showId > 0) {
        var showurl = url2 + '/' + $('#show-id').val();
        console.log(showurl);
        // $.get(url2)
    }

    var options = {
        key: '9856c49448b1c927e9fd4080d7c55fad',
        limit: 10
    };

    var control = L.Control.openCageSearch(options).addTo(mymap);

    control.markGeocode = function(result) {
        var coords = result.center;
        console.log(result);
        L.popup()
            .setLatLng(coords)
            .setContent('<p>Address: ' + result.name + '</p><p>Lat: ' + coords.lat + '</p><p>Lng: ' + coords.lng + '</p>')
            .openOn(mymap);
        mymap.setView([coords.lat, coords.lng], 8);
    };



    var showForm = '<form id="show-form"><div class="form-group"><label for="date">Date:</label><input type="date" class="form-control" id="date"></div><div class="form-group"><label for="address">Address:</label><input type="text" class="form-control" id="address"></div><div class="form-group"><label for="venue">Venue:</label><input type="text" class="form-control" id="venue"></div><div class="form-group"><label for="contact">Contact:</label><input type="text" class="form-control" id="contact"></div><div class="form-group"><label for="pay">Pay:</label><input type="number" class="form-control" id="pay"></div><div class="form-group"><label for="lat">Lat:</label><input type="text" class="form-control" id="lat"></div><div class="form-group"><label for="lang">Lang:</label><input type="text" class="form-control" id="lang"></div><button type="submit" class="btn btn-default">Add Show</button></form>';

});
