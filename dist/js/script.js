$(document).ready(function() {

    var TD = {
      init: function(){
        this.initMap.init(this.els.map);
        this.updateShow(this.els.singleShowForm);
        this.initShowForm(this.els.showsForm);
        this.deleteShow(this.els.deleteShowButton);
        this.toggleShowForm(this.els.showShowForm);
      },
      els: {
        singleShowForm: $('#single-show-form'),
        map: $('#mapid'),
        showsForm: $('#show-form'),
        deleteShowButton: $('#delete-show'),
        showShowForm: $('#show-show-form')
      },
      initMap:  {
          init: function(map) {
              if(map.length)
                var mymap = L.map('mapid').setView([27.664827, -81.515754], 5);
                this.makeTiles(mymap);
                this.disableScroll(mymap);
          },
          makeTiles: function(map) {
              L.tileLayer("http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
                  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                  maxZoom: 18,
                  id: 'brittonwalker.okh8c6b8',
                  accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
              }).addTo(map);
          },
          disableScroll: function(map) {
              map.scrollWheelZoom.disable();
          }
      },
      toggleShowForm: function(b){
        b.click(function(){
          $(this).toggle();
          TD.els.showsForm.toggle();
        })
      },
      deleteShow: function(b){
        b.click(function(){
          var showId = $(this).attr('data-id');
          var showUrl = "http://localhost:8080/api/show/" + showId.toString();
          $.ajax({
              url: showUrl,
              type: 'DELETE'
          }).done(function(res) {
              console.log(res);
              window.location = "http://localhost:8080/shows/";
          }).fail(function(res) {
              console.log("Failed to update.");
              console.log(res);
          });
        });
      },
      updateShow: function(b){
        if(b.length)
          b.submit(function(e) {
            e.preventDefault();
            var showId = b.attr('data-id');
            var showUrl = "http://localhost:8080/api/show/" + showId.toString();
            var show;
            var oldMerch = [];
            b.find($('.form-group')).each(function() {
                var item = $(this).find('input').attr('id');
                var itemValue = $(this).find('input').val();
                var itemType = $(this).find('input').attr('data-merch-type');
                if (itemValue === '') {
                    itemValue = 0;
                }
                oldMerch.push(itemValue);
            });
            $.get(showUrl, function(data) {
                var show = data;
                return show;
            }).done(function(show) {
                $.each(show.merch, function(z, k) {
                    k.sold = parseInt(k.sold) + parseInt(oldMerch[z]);
                });
                $.ajax({
                    url: showUrl,
                    type: 'PUT',
                    data: show,
                    dataType: 'json'
                }).done(function(res) {
                    $.each(show.merch, function(a, b){
                      var merchUrl = 'http://localhost:8080/api/merch/' + b.id;
                      $.get(merchUrl, function(data){
                        var merch = data;
                        merch.quantity = merch.quantity - b.sold;
                        return merch;
                      }).done(function(merch){
                        $.ajax({
                          url: merchUrl,
                          type: 'PUT',
                          data: merch,
                          dataType: 'json'
                        }).done(function(res){
                          console.log(res);
                        })
                      })
                    })
                    console.log(res);
                    location.reload();
                }).fail(function(res) {
                    console.log("Failed to update.");
                    console.log(res);
                });
            });
        });
      },
      initShowForm: function(b){
        if(b.length)
        b.submit(function(e) {
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
            $.get('http://localhost:8080/api/merch', function(data) {
                $.each(data, function(i, v) {
                    var singleItem = {
                        item: v.name,
                        sold: 0,
                        id: v._id
                    };
                    show.merch.push(singleItem);
                    return show;
                });
            }).done(function() {
                $.ajax({
                    url: 'http://localhost:8080/api/show',
                    type: 'POST',
                    data: show,
                    dataType: 'json'
                }).done(function(res) {
                    location.reload();
                }).fail(function(res) {
                    console.log("Failed to update.");
                    console.log(res);
                });
            });
        });
      }
    };
    TD.init();

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
            location.reload();
        }).fail(function(res) {
            console.log("Failed to update.");
            console.log(res);
        });
    });

    // var mapObject = {
    //     init: function() {
    //         var map = $('#mapid');
    //         var mymap = L.map('mapid').setView([27.664827, -81.515754], 5);
    //         this.makeTiles(mymap);
    //         this.disableScroll(mymap);
    //     },
    //     makeTiles: function(map) {
    //         L.tileLayer("http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    //             attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //             maxZoom: 18,
    //             id: 'brittonwalker.okh8c6b8',
    //             accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
    //         }).addTo(map);
    //     },
    //     disableScroll: function(map) {
    //         map.scrollWheelZoom.disable();
    //     }
    // }
    // mapObject.init();
    // console.log('hey there')
    // var map = $('#mapid');
    // var mymap = L.map('mapid').setView([27.664827, -81.515754], 5);
    // L.tileLayer("http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'brittonwalker.okh8c6b8',
    //     accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
    // }).addTo(mymap);

    // mymap.scrollWheelZoom.disable();
    //
    // var url2 = 'http://localhost:8080/api/show/';
    // var showpage = 'http://localhost:8080/shows/';
    // var $showsTable = $('#shows-table');
    // $.get(url2, function(data) {
    //     $.each(data, function(index, value) {
    //         var lat = value.lat || null;
    //         var lang = value.lang || null;
    //         L.marker([lat, lang]).addTo(mymap);
    //     });
    // });
    //
    // var url = 'http://localhost:8080/api/merch/';
    //
    // var showId = $('#show-id');
    // if (showId > 0) {
    //     var showurl = url2 + '/' + $('#show-id').val();
    //     console.log(showurl);
    //     // $.get(url2)
    // }
    //
    // var options = {
    //     key: '9856c49448b1c927e9fd4080d7c55fad',
    //     limit: 10
    // };
    //
    // var control = L.Control.openCageSearch(options).addTo(mymap);
    //
    // control.markGeocode = function(result) {
    //     var coords = result.center;
    //     console.log(result);
    //     L.popup()
    //         .setLatLng(coords)
    //         .setContent('<p>Address: ' + result.name + '</p><p>Lat: ' + coords.lat + '</p><p>Lng: ' + coords.lng + '</p>')
    //         .openOn(mymap);
    //     mymap.setView([coords.lat, coords.lng], 8);
    // };

});
