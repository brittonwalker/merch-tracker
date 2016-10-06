$(document).ready(function() {

    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer("http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'brittonwalker.okh8c6b8',
        accessToken: 'pk.eyJ1IjoiYnJpdHRvbndhbGtlciIsImEiOiJjaWozOG16d3IwMDN0dW1rcDU3OXJxeWEzIn0.yfclBrxnvpCzJZkZtLYQdg'
    }).addTo(mymap);

    mymap.scrollWheelZoom.disable();

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
            var date = new Date(value.date);
            var day = date.getDate();
            var month = date.getMonth()+1;
            var year = date.getFullYear();
            // var date = value.date;
            // var day = value.date.getDay();
            // var year = value.date.getYear();
            console.log(month);

            var displayDate = '<td>' + month + '/' + day + '/' + year + '</td>';
            var venue = '<td>' + value.venue + '</td>';
            var contact = '<td>' + value.contact + '</td>';
            var pay = '<td>' + value.pay + '</td>';
            var city = '<td>' + value.city + '</td>';
            var lat = value.lat || null;
            var lang = value.lang || null;
            console.log(value);
            L.marker([lat, lang]).addTo(mymap);
            $showsTable.append('<tr>' + displayDate + city + venue + contact + pay + '</tr>')
        })
    })



    // mymap.on('click', function() {
    //     if (mymap.scrollWheelZoom.enabled()) {
    //         mymap.scrollWheelZoom.disable();
    //     } else {
    //         mymap.scrollWheelZoom.enable();
    //     }
    // });
})
