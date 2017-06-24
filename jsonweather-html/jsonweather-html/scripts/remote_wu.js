// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
        url: "http://api.wunderground.com/api/10a20877c5c8b9d5/geolookup/conditions/q/" + lat + "," + long + ".json",
dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
      var state = parsed_json['location']['state']
  var temp_f = parsed_json['current_observation']['temp_f'];
var weather = parsed_json['current_observation']['weather'];
var temp_c = parsed_json['current_observation']['temp_c'];
var wind_mph = parsed_json['current_observation']['wind_mph'];
      var relative_humidity = parsed_json['current_observation']['relative_humidity'];
$("#currentTemp").html(Math.round(temp_f) + "&#8457");
$('#cityDisplay').html(location + ',' + state);
$('#title').html(location + ',' + state);
$('#summary').html(weather);
$("#add1").text('relative humidity '+ relative_humidity);
$("#add2").text(wind_mph + 'MPH');
$("#add3").html(temp_c + "&#8451");

      $("#cover").fadeOut(250);
    }
           });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
