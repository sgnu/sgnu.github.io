/*	Localstorage:
 *	key is the site name
 *	value is the site url
 */

var addOpened = false;
var editOpened = false;

function compare(a, b) {
	const itemA = a.name.toLowerCase();
	const itemB = b.name.toLowerCase();

	if (itemA > itemB){
		return 1;
	}
	else if (itemA < itemB ) {
		return -1;
	} else {
		return 0;
	}
}

function initializeList() {
	$("#links").html("");
	updateList("");
}

function updateList(substring) {
	$("#links").html("");
	var links = [];
	$.each(localStorage, function(key, value) {
		if (key.toString().toLowerCase().includes(substring.toLowerCase()) && localStorage.hasOwnProperty(key)) {
			link = {name: key,
			url: value};
			links.push(link);
		}
	});

	links.sort(compare);
	
	for (var i = 0; i < links.length; i++) {
		$("#links").append("<a href='" + links[i].url + "'>" + links[i].name + "</a>");
	}
}

function openAdd() {
	if (!addOpened) {
		$("#add-container").fadeIn(300);
		addOpened = !addOpened;
		$("#sitename").focus();
		$("#add").animate({top: "70px"}, 200);
	} else {
		$("#add-container").fadeOut(150);
		addOpened = !addOpened;
		$("#search").focus();
		$("#add").animate({top: "20px"}, 400);
	}
}

function addSite() {
	var siteName = $("#sitename").val();
	var siteURL = $("#siteurl").val();
	if (!(siteURL.includes("https://") || siteURL.includes("http://"))) {
		siteURL = "https://" + siteURL;
	}

	localStorage[siteName] = siteURL;
	updateList("");
	$("#sitename").val("");
	$("#siteurl").val("");
	$("#sitename").focus();
	updateEditList();
}

//	Hit enter while adding a site
$("#siteurl").keyup(function(event) {
	if (event.keyCode === 13) {
		if ($("#sitename").val() != "" && $("#siteurl").val() != "") {
			addSite();
		}
	}
});

//	Hit enter in the search bar
$("#search").keyup(function(event) {
	if (event.keyCode === 13) {
		if ($("#links").children().length > 0) {
			window.open($("#links a:first-child").attr('href'), "_self");
		} else if ($("#search").val().substring(0, 2) === "y ") {
			window.open("https://youtube.com/search?q=" + $("#search").val().substring(2), "_self");
		} else if ($("#search").val().includes(".")) {
			if ($("#search").val().includes("http")) {
				window.open($("#search").val(), "_self");
			} else {
				window.open("https://" + $("#search").val(), "_self");
			}
		} else {
			window.open("https://google.com/search?q=" + $("#search").val(), "_self");
		}
	} else if (event.keyCode === 27) {
		$("#search").val("");
		updateList("");
	}
})

function updateTime() {
	var date = new Date($.now());
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	var greeting = "";

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	if (hour < 10) {
		hour = "0" + hour;
	}

	if (min < 10) {
		min = "0" + min;
	}

	if (sec < 10) {
		sec = "0" + sec;
	}

	if (hour > 0 && hour < 12) {
		greeting = "Good Morning";
	} else if (hour < 17) {
		greeting = "Good Afternoon";
	} else if (hour < 22) {
		greeting = "Good Evening";
	}
	else {
		greeting = "Good Night";
	}

	var time = hour + ":" + min + ":" + sec;
	var dateText = months[month] + " " + day + ", " + year;

	$("#time").text(time);
	$("#greeting").text(greeting);
	$("#date").text(dateText)
}

function openEdit() {
	if (!editOpened) {
		$("#edit-container").fadeIn(300);
		$("#edit").animate({right: "375px"}, 200);
		editOpened = !editOpened;
	} else {
		$("#edit-container").fadeOut(150);
		$("#edit").animate({right: "30px"}, 400);
		editOpened = !editOpened;
	}
}

function deleteSite(site) {
	delete localStorage[site];
	updateEditList();
	updateList($("#search").val());
}

function updateEditList() {
	$("#edit-container").html("");
	
	var links = [];
	$.each(localStorage, function(key, value) {
		if (localStorage.hasOwnProperty(key)) {
			link = {name: key,
			url: value};
			links.push(link);
		}
	});

	links.sort(compare);
	
	for (var i = 0; i < links.length; i++) {
		$("#edit-container").append("<div><p>" + links[i].name + "</p><p>" + links[i].url + "</p><button type='button' onclick=deleteSite('" + links[i].name + "')>Delete</button>");
	}
}

$(document).ready(function() {
	$("#add-container").hide();
	$("#edit-container").hide();
	//load();
	updateTime();
	updateEditList();
	setInterval(function() {updateTime()}, 500);
});
