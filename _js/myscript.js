// myscript - Sharon Lee

var rowID;	// use to hold user's selecction
var xmlData;	// holds the entire XML file from ajax call

$(document).on("pagecreate", "#home", function(){
	console.log("in doc on");

	$.ajax({
		type: "GET",
		url: "books.xml",
		dataYtpe: "xml",
		success: function(xml){
			buildmenu(xml)

		},
		error: function(e){
			alert(e.status + "-" + e.statusText + " xml not found or misspelled");
		}
	});
});

function buildmenu(xml){

	var n=0;

	xmlData = xml;

	// header and footer
	$("h1").html("<h3  style='text-align:center;'>" +
					$(xml).find("title").text() + "</h3>");

	$("footer").html("<p style='text-align:center;'>Student Name: " +
					$(xml).find("sName").text() +
					"<br>" +

					"Student ID: " +
					$(xml).find("sName").attr("sNumber") +
					"<br>" +

					"Program: " +
					$(xml).find("sName").attr("sProgram") +
					"</p>"
					);

	$("#pr").html("<h1  style='text-align:center;'>Personal Review</h1>");

	// create nav bar for home page
	$("#navhome").html("<ul id='listhome'><li>" +
		"<a href='#home' class='ui-btn ui-icon-home ui-btn-icon-top'>HOME</a>" +
		"</li></ul>");

	$("#navind").html("<ul id='listind'><li>" +
		"<a href='#home' class='ui-btn ui-icon-home ui-btn-icon-top'>HOME</a>" +
		"</li></ul>");

	// book list
	$(xml).find("book").each(function(){
		$("ul#bookMenu").append(
			"<li li-id='" + n + "'>" +
				"<a href='#individual'>" +
				$(this).find("bookName").text() +
				"</a>" +
			"</li>"
		);
	// book buttons for nav bar	
	$("#listhome").append(
		"<li li-id='" + n + "'>" +
				"<a href='#individual' class='ui-btn ui-icon-info ui-btn-icon-top'>" +
					$(this).find("bookName").text() +
				"</a>" +
			"</li>"
	);
	$("#listind").append(
		"<li li-id='" + n + "'>" +
				"<a href='#individual' class='ui-btn ui-icon-info ui-btn-icon-top'>" +
					$(this).find("bookName").text() +
				"</a>" +
			"</li>"
	);
	n++;

	});
	$("ul#bookMenu").listview("refresh");
	$("#navhome").navbar("destroy");
	$("#navhome").navbar();
}	// end of buildmenu

// #book menu
$(document).on("click", "ul#bookMenu >li", function(){
	rowID = $(this).closest("li").attr("li-id");
	console.log("li selected: " + rowID);
});

// #home navbar
$(document).on("click", "#listhome >li", function(){
	rowID = $(this).closest("li").attr("li-id");
	console.log("li selected: " + rowID);
});

// #individual navbar
$(document).on("click", "#listind >li", function(){
	rowID = $(this).closest("li").attr("li-id");
	console.log("li selected: " + rowID);

	parseXML(xmlData, rowID);
});

$(document).on("pagecreate", "#individual", function(){
	$("#navind").navbar("destroy");
	$("#navind").navbar();
});


$(document).on("pageshow", "#individual", function(){
	parseXML(xmlData, rowID);
});

// show books' information
function parseXML(result, choice){
	$("#bookinfo").html(
		"<p>Book name: " +
		$(result).find("bookName:nth(" + choice + ")").text() +
		"<br>" +

		"Book type: " +
		$(result).find("description:nth(" + choice + ")").attr("bookType") +
		"<br>" +

		"Author Name: " +
		$(result).find("authorName:nth(" + choice + ")").text() +
		"<br>" +

		"publisher: " +
		$(result).find("publisherName:nth(" + choice + ")").text() +
		"<br>" +

		"Price: " +
		$(result).find("price:nth(" + choice + ")").text() +
		"<br>" +

		"Description: " +
		$(result).find("description:nth(" + choice + ")").text() +
		"</p>"
	);

	$("#bookimg").html("<p>Book cover image<br><img src='_images/" +
					$(result).find("bookName:nth(" + choice + ")").attr("bookimg") +
					"' style='width:50%; height:60%; display: block; margin: 0 auto;'></p>"
					);
	// popup personal review				
	$("#pp").html("<p><strong>Book name: </strong>" + 
					$(result).find("bookName:nth(" + choice + ")").text() +
				"</p><p><strong>Review: </strong>" +
				$(result).find("personalReview:nth(" + choice + ")").text() +
				"</p>"
				);

}
