/*	Localstorage:
 *	key is the site name
 *	value is the site url
 */

var addOpened = false;
var editOpened = false;

function initializeList() {
	$.each(localStorage, function(key, value) {
		if (localStorage.hasOwnProperty(key)) {
			$("#links").append("<li><a href='" + value + "'>" + key + "</a></li>");
		}
	})
}

function updateList(substring) {
	$("#links").html("");
	$.each(localStorage, function(key, value) {
		if (key.toString().toLowerCase().includes(substring.toLowerCase()) && localStorage.hasOwnProperty(key)) {
			$("#links").append("<li><a href='" + value + "'>" + key + "</a></li>");
		}
	});
}

function openAdd() {
	if (!addOpened) {
		$("#add-container").fadeIn(300);
		addOpened = !addOpened;
		$("#sitename").focus();
	} else {
		$("#add-container").fadeOut(150);
		addOpened = !addOpened;
		$("#search").focus();
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
		window.open($("#links li:first-child a").attr('href'), "_self");
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
	$.each(localStorage, function(key, value) {
		if (localStorage.hasOwnProperty(key)) {
			$("#edit-container").append("<div><p>" + key + "</p><p>" + value + "</p><button type='button' onclick=deleteSite('" + key + "')>Delete</button>");
		}
	});
}

$(document).ready(function() {
	$("#add-container").hide();
	$("#edit-container").hide();
	//load();
	updateTime();
	updateEditList();
	setInterval(function() {updateTime()}, 500);
});
