//me


$(document).ready(function () {
	//$('#productWrapper').hide();
    getData();
	});

function getData() {
	$.ajax({
		url: "/acme/js/acme.json",
		dataType: "json",
		success: function (data) {
			console.log(data);
		}
	});
}


$("#page-nav").on("click", "a", function (evt) {
	// Intercept the menu link clicks
	evt.preventDefault();
    var link = $(this).text();
	console.log("the link is:" + link);
    //link += "";

    if (link != 'Home') {
$('#homepageWrapper').hide();
$('#productWrapper').show();
        
         }
        else{
            $('#homepageWrapper').show();
		$('#productWrapper').hide();
            
        } 
    
        
$.ajax({
		url: "/acme/js/acme.json",
		dataType: "json",
		success: function (data) {
        var picPath=(data[link].path);
           console.log("picPath is:" + picPath); 
            $("#productImg").html("<img src='" + picPath + "'>");
			$('#description').text(data[link].description);
			$('#madeBy').text(' ' + data[link].manufacturer);
			$('#reviewScores').text(data[link].reviews + '/5 stars');
			$('#price').text('Price: $' + data[link].price);
//var picPath= "data." + link + ".path";
//console.log("picPath is:" + picPath);
var made = "data." + link + ".manufacturer";
//var summary = "data." + link + ".description";
//var review= "data." + link + ".reviews";
//var price= "data." + link + ".price";
//$("#productImg").text("<img src='" + picPath + "'>");
//$("#madeBy").text(' ' + data[link].manufacturer);
// $("#madeBy").text(made);
console.log(data[link].manufacturer);
console.log(made);
//$("#summary").text(summary);
//$("#reviewScores").text(review);
//$("#price").text("Price: " + price);
    }
});
   
        
});