var returned;
function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "https://api.wunderground.com/api/10a20877c5c8b9d5/geolookup/forcast/conditions/q/" +
      input + ".json",
    dataType: "jsonp",
    success: function(data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
    }
  });
}
$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); 
    returned = data;
      
      // test for JSON received
    
      // Begin building output
    var output = '<ol>';
    $.each(returned.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="//www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';

    // Intercept the menu link clicks
$("#searchResults").on("click", "a", function(evt) {
  evt.preventDefault();
  console.log('click occured');
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
  $.ajax({
    url: "https://tjw84.github.io/menu-activity/menu-activity/scripts/weather.json",
    dataType: "json",
    success: function(data) {
      console.log(data);
      console.log(data[jsonCity]);
      var zip = data[jsonCity].zip;
      console.log(zip);
      getData(zip);
    }
  });
});

      $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup



