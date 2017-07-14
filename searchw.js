var returned;

$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); 
    returned = data;
    
      // Begin building output
    var output = '<ol>';
    $.each(returned.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="https//www.wunderground.com' + val.l + '.json" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    });
  
       // end each
    output += '</ol>';
      // completed array output
$("#searchResults").html(output);
      });
  });
    // Intercept the menu link clicks
$("#searchResults").on("click", "a", function(evt) {
  evt.preventDefault();
  console.log('click occured');
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
//  $.ajax({
//    url: "https://api.wunderground.com/api/10a20877c5c8b9d5/geolookup/forecast/conditions/q/" + location + ".json",
//    dataType: "json",
//    success: function(data) {
      //console.log(jsonCity);
        $();
      //console.log(data[jsonCity]);
      //var zip = data[jsonCity].zip;
      //console.log(zip);
      getData(jsonCity);
        var index = $(this).index("a")
        $('#searchResults').hide();
    });
//  });
// });
    
    function getData(input) {
  // Get the data from the wunderground API
  $.ajax( {
    url: "https://api.wunderground.com/api/10a20877c5c8b9d5/geolookup/forcast/conditions/q/" +
      input + ".json",
    dataType: "jsonp",
    success: function(data) {
      console.log(data);
      var location = input;
      var temp_f = data.current_observation.temp_f;
       // var high = data.forecast.simpleforecast.forecastday.high.fahrenheit;
		//	console.log(data.forecast.simpleforecast.high);
			//var low= data.forecast.simpleforecast.forecastday[1].low.fahrenheit;
 //  var high = parsed_json['simpleforecast']['forecastday']['date']['high']['fahrenheit'];
//var wind_mph = parsed_json['forecastday']['wind_mph'];
//      var low = parsed_json['forecastday']['low'];
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°F');
      $("#summary").text(toTitleCase(data.current_observation.icon));
   // $("#add1").text(high +'°F');
//   $("#add3").text(wind_mph + 'MPH');
//$("#add2").html(low + '°F');
      $("#cover").fadeOut(250);
    }
  })
}

       // send results to the page
//  }); // end getJSON
// }); // end onkeyup
function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}