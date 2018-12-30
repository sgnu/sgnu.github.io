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
		$("#add-container").fadeIn(500);
		addOpened = !addOpened;
		$("#sitename").focus();
	} else {
		$("#add-container").fadeOut(250);
		addOpened = !addOpened;
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

$("#siteurl").keyup(function(event) {
	if (event.keyCode === 13) {
		if ($("#sitename").val() != "" && $("#siteurl").val() != "") {
			addSite();
		}
	}
});

function updateTime() {
	var date = new Date($.now());
	var hour = date.getHours();
	var min = date.getMinutes();
	var sec = date.getSeconds();
	var greeting = "";

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

	$("#time").text(time);
	$("#greeting").text(greeting);
}

function openEdit() {
	if (!editOpened) {
		$("#edit-container").fadeIn(500);
		editOpened = !editOpened;
	} else {
		$("#edit-container").fadeOut(250);
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