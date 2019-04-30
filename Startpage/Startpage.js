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
		$("#add").animate({top: "90px"}, 200);
		$("#edit").fadeOut(200);

	} else {
		$("#add-container").fadeOut(150);
		addOpened = !addOpened;
		$("#search").focus();
		$("#add").animate({top: "20px"}, 400);
		$("#edit").fadeIn(200);

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
	} else if (event.keyCode === 27) {	//	Hit escape
		openAdd();
	}
});

//Hit escape while adding a site
$("#sitename").keyup(function(event) {
	if(event.keyCode === 27) {
		openAdd();
	}
});


//	typing in the search bar
$("#search").keyup(function(event) {
	var value = $(this).val();
	
	if (event.keyCode === 13) {
		if ($("#links").children().length > 0) {
			window.open($("#links a:first-child").attr('href'), "_self");
		} else if (value.substring(0, 2) === "y ") {
			window.open("https://youtube.com/search?q=" + value.substring(2), "_self");
		} else if (value.substring(0, 2) === "g ") {
			window.open("https://google.com/search?q=" + value.substring(2), "_self");
		} else if (value.substring(0,3) === "/r/") {
			window.open("https://reddit.com" + value, "_self");
		} else if (value.includes(".")) {
			if (value.includes("http")) {
				window.open(value, "_self");
			} else {
				window.open("https://" + value, "_self");
			}
		} else {
			window.open("https://google.com/search?q=" + value, "_self");
		}
	} else if (event.keyCode === 27) {	//	Hit escape instead of enter
		$(this).val("");
		updateList("");
	} else if (event.keyCode === 9) {
		event.preventDefault();
	}

	var stroke = $(this).css('border-width');
	
	if (value.substring(0,2) === "g ") {
		$(this).css("border-color", '#7ddf64').animate({
			borderWidth: 4,
			marginTop: 0
		}, 100);
	} else if (value.substring(0,2) === "y ") {
		$(this).css("border-color", '#cc444b').animate({
			borderWidth: 4,
			marginTop: 0
		}, 100);
	} else if (value.substring(0, 3) === "/r/") {
		$(this).css("border-color", '#ff6f59').animate({
			borderWidth: 4,
			marginTop: 0
		}, 100);	
	} else if (stroke != "0px"){
		$(this).animate({
			borderWidth: 0,
			marginTop: 4
		}, 100);
	}
});


function updateTime() {
	var date = new Date($.now());
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();
	var hour = date.getHours();
	var min = date.getMinutes();
	var greeting = "";

	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	if (hour < 10) {
		hour = "0" + hour;
	}

	if (min < 10) {
		min = "0" + min;
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

	var time = hour + "" + min;
	var dateText = months[month] + " " + day + ", " + year;

	$("#time").text(time);
	$("#greeting").text(greeting);
	$("#date").text(dateText)
}

function openEdit() {
	if (!editOpened) {
		$("#edit-container").fadeIn(300);
		$("#edit").animate({right: "375px"}, 200);
		$("#add").fadeOut(200);
		editOpened = !editOpened;
	} else {
		$("#edit-container").fadeOut(150);
		$("#edit").animate({right: "30px"}, 400);
		$("#add").fadeIn(200);
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

function getWeather() {
	$.get("http://api.openweathermap.org/data/2.5/weather?zip=19120&appid=6b2d34c1fdae064a380bfb26b3d6af1a&units=imperial", (data) => {
		const condition = data.weather[0].main;
		const temperature = Math.round(data.main.temp);
		console.log(data);


		$("#weather").text(condition + " " + temperature + "F");

	});

}

$(document).ready(function() {
	$("#add-container").hide();
	$("#edit-container").hide();
	initializeList();
	updateTime();
	updateEditList();
	getWeather();
	setTimeout(function() {
		$("#search").focus();
	}, 500);
	setInterval(function() {updateTime()}, 1000);
});
