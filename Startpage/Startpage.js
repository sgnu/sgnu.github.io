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

//  Hit escape while adding a site
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
    } else if (value.substring(0,2) === "m ") {
      window.open("https://mangadex.org/search?title=" + value.substring(2), "_self");
    } else if (value.substring(0,3) === "wi ") {
      window.open("https://en.wikipedia.org/w/index.php?search=" + value.substring(3), "_self");
    } else if (value.substring(0,5) === "dict ") {
      window.open("https://www.merriam-webster.com/dictionary/" + value.substring(5), "_self");
    } else if (value.substring(0,3) === "wa ") {
      window.open("https://www.wolframalpha.com/input/?i=" + value.substring(3), "_self");
    } else if (value.length > 1 && value[0] === "/" && value[value.length - 1] === "/") {
			window.open("https://boards.4channel.org/" + value.substring(1, value.length - 1), "_self");
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
    value = $(this).val();
		updateList("");
	} else if (event.keyCode === 9) {   //  Hit tab
		event.preventDefault();
	}

  var width = $("#bar").css('width');

  if (value === "help") {
    $("#modal").fadeIn(200);
  } else {
    $("#modal").fadeOut(200);
  }

	if (value.substring(0,2) === "g ") {
		$("#bar").css("background", "linear-gradient(to right, #a3be8c, #a3be8c10").css("width", "100%");
	} else if (value.substring(0,2) === "y ") {
		$("#bar").css("background", "linear-gradient(to right, #bf616a, #bf616a10").css("width", "100%");
	} else if (value.substring(0, 3) === "/r/") {
		$("#bar").css("background", "linear-gradient(to right, #d08770, #d0877010").css("width", "100%");
  } else if (value.substring(0, 2) === "m ") {
    $("#bar").css("background", "linear-gradient(to right, #5e81ac, #5e81ac10").css("width", "100%");
  } else if (value.substring(0, 3) === "wi ") {
    $("#bar").css("background", "linear-gradient(to right, #eceff4, #eceff410").css("width", "100%");
  } else if (value.substring(0, 5) === "dict ") {
    $("#bar").css("background", "linear-gradient(to right, #5e81ac, #5e81ac10").css("width", "100%");
  } else if (value.substring(0, 3) === "wa ") {
    $("#bar").css("background", "linear-gradient(to right, #bf616a, #bf616a10").css("width", "100%");
  } else if (value.length > 1 && value[0] === "/" && value[value.length - 1] === "/") {
		$("#bar").css("background", "linear-gradient(to right, #a3be8c, #a3be8c10").css("width", "100%");
	} else {
    $("#bar").css("width", 0);
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

	var time = hour + ":" + min;
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
	$.get("https://api.openweathermap.org/data/2.5/weather?zip=19120&appid=6b2d34c1fdae064a380bfb26b3d6af1a&units=imperial", (data) => {
		const condition = data.weather[0].main;
		const temperature = Math.round(data.main.temp);
		console.log(data);
		$("#weather").text(condition + " " + temperature + "F");
	});
}

$(document).ready(function() {
	$("#add-container").hide();
  $("#edit-container").hide();
  $("#modal").hide();
	initializeList();
	updateTime();
	updateEditList();
	getWeather();
  setInterval(function() {updateTime()}, 1000);
});
