$(document).ready(
    function() {
        $("body").css("background-color","beige");
        getGeoLocation();
    }
);

function getGeoLocation() {
    navigator.geolocation.getCurrentPosition(WeatherPosition);
}

function WeatherPosition(position) {
    $.getJSON(
        "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=15be36445a2ae01a56daef040c36b9f3",
        function(weather) {
            var description = weather["weather"][0]["description"];
            var basic = weather["weather"][0]["main"];
            var temperature = weather["main"]["temp"] - 273.15;
            var name = weather["name"];
            $("#test").append("<p id = 'location'>Location: " + name + "</p>");
            $("#test").append("<p id = 'weather'>Weather: " + description + ", "  + Math.ceil(temperature) + " degree C</p>");
            $.getJSON(
                "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2ec2303f2f851adc69d5d238f3b76e41&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&accuracy=1&tags=" + basic + "&sort=relevance&extras=url_l&format=json&nojsoncallback=1",
                function(result) {
                    var id = result["photos"]["photo"][0]["id"];
                    var secret = result["photos"]["photo"][0]["secret"];
                    var server = result["photos"]["photo"][0]["server"];
                    var farm = result["photos"]["photo"][0]["farm"];
                    $("body").css(
                        "background-image",
                        "url(https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_b.jpg)"
                    );
                    $("body").css("background-repeat", "no-repeat");
                }
            );
        }
    );
}