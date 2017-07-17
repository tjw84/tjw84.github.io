$(document).ready(function () {
    $('#SideProduct').hide();
    getData();
	});

function getData() {
	$.ajax({
		url: "/acme/js/acme.json",
		dataType: "json",
		success: function (data) {
			console.log(data);
            $("#Home").html(data.Navigation.link1);
			$("#Anvils").html(data.Navigation.link2);
			$("#Decoys").html(data.Navigation.link3);
			$("#Explosives").html(data.Navigation.link4);
			$("#Traps").html(data.Navigation.link5);
		}
	});
}


$("#page-nav").on("click", "a", function (evt) {
	// Intercept the menu link clicks
	evt.preventDefault();
    var link = $(this).text();
	console.log("the link is:" + link);
 $("title").text(link + " | ACME");
    if (link != 'Home') {
$('#MainProduct').hide();
$('#SideProduct').show();
$('#Content1').hide();
       
$.ajax({
		url: "/acme/js/acme.json",
		dataType: "json",
		success: function (data) {
        var picPath=(data[link].path);
           console.log("picPath is:" + picPath); 
            $("#productImg").html("<img src='" + picPath + "'>");
			$('#summary').text(data[link].description);
			$('#madeBy').text(' ' + data[link].manufacturer);
			$('#reviewScores').text(data[link].reviews + '/5 stars');
			$('#price').text('Price: $' + data[link].price);
var made = "data." + link + ".manufacturer";
console.log(data[link].manufacturer);
console.log(made);
            
            // Code i want to play with latter
            
//var picPath= "data." + link + ".path";
//console.log("picPath is:" + picPath);
            //var summary = "data." + link + ".description";
//var review= "data." + link + ".reviews";
//var price= "data." + link + ".price";
//$("#productImg").text("<img src='" + picPath + "'>");
//$("#madeBy").text(' ' + data[link].manufacturer);
// $("#madeBy").text(made);
//$("#summary").text(summary);
//$("#reviewScores").text(review);
//$("#price").text("Price: " + price);
    }
});
   
        }
        else{
$('#SideProduct').hide();
$('#MainProduct').show();
$('#Content1').show();	
            
        }       
});