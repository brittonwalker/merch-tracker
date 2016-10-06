$(document).ready(function() {
    var url = 'http://localhost:8080/api/merch/';
    var url2 = 'http://localhost:8080/api/show/';
    var $tbody = $('#merch-table');
    var $showsTable = $('#shows-table')

    $.get(url, function(data) {
        $.each(data, function(index, value) {
            var urlId = '<a href="' + url + value._id + '">';
            $tbody.append('<tr><td>' + urlId + value.name + '</a></td>><td>' + value.quantity + '</td></tr>')
        });
    })

    $.get(url2, function(data) {
        $.each(data, function(index, value) {
            var date = '<td>' + value.date + '</td>';
            var venue = '<td>' + value.venue + '</td>';
            var contact = '<td>' + value.contact + '</td>';
            var pay = '<td>' + value.pay + '</td>';
            $showsTable.append('<tr>' + date + venue + contact + pay + '</tr>')
        })
    })

    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer("http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'brittonwalker.okh8c6b8',
        accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
    }).addTo(mymap);

    mymap.scrollWheelZoom.disable();

    // mymap.on('click', function() {
    //     if (mymap.scrollWheelZoom.enabled()) {
    //         mymap.scrollWheelZoom.disable();
    //     } else {
    //         mymap.scrollWheelZoom.enable();
    //     }
    // });
})
