//-----------------------------------------------------
//CURTAIN MENU
function openNav() {
	document.getElementById("curtain-nav").style.width = "30%";			
}

function closeNav() {
	document.getElementById("curtain-nav").style.width = "0%";			
}		

//-----------------------------------------------------
//TOGGLE FORMS
function toggleGoogleForm() {
	var gForm = document.getElementById("google-form-id");
	var htmlForm = document.getElementById("html-form-id");
  	if (htmlForm.style.display = "flex") {
    	htmlForm.style.display = "none";
  	}
	gForm.style.display = "flex";
	document.getElementById("button-2-id").style.backgroundColor = "#FF9633";
	document.getElementById("button-1-id").style.backgroundColor = "white";
}

function toggleHtmlForm() {
	var htmlForm = document.getElementById("html-form-id");
	var gForm = document.getElementById("google-form-id");
  	if (gForm.style.display = "flex") {
    	gForm.style.display = "none";
  	}
	htmlForm.style.display = "flex";
	document.getElementById("button-1-id").style.backgroundColor = "#FF9633";
	document.getElementById("button-2-id").style.backgroundColor = "white";
	
}

//-----------------------------------------------------
//TOGGLE XML/RSS
function toggleXml() {
	var xmlSection = document.getElementById("xml-section-id");
	var xmlTitleSection = document.getElementById("xml-title-id");
	var rssSection = document.getElementById("rss-section-id");
	var rssTitleSection = document.getElementById("rss-title-id");
  	if (rssSection.style.display = "flex") {
    	rssSection.style.display = "none";
  	}
	xmlSection.style.display = "flex";
	xmlSection.style.flexDirection = "column";
	rssTitleSection.style.display = "none";
	xmlTitleSection.style.display = "block";
	document.getElementById("button-1-id").style.backgroundColor = "#FF9633";
	document.getElementById("button-2-id").style.backgroundColor = "white";
}

function toggleRss() {
	var rssSection = document.getElementById("rss-section-id");
	var rssTitleSection = document.getElementById("rss-title-id");
	var xmlTitleSection = document.getElementById("xml-title-id");
	var xmlSection = document.getElementById("xml-section-id");
  	if (xmlSection.style.display = "flex") {
    	xmlSection.style.display = "none";
  	}
	  rssSection.style.display = "flex";
	  rssSection.style.flexDirection = "column";
	  rssTitleSection.style.display = "block";
	  xmlTitleSection.style.display = "none";
	  document.getElementById("button-2-id").style.backgroundColor = "#FF9633";
	  document.getElementById("button-1-id").style.backgroundColor = "white";

	  let proxy = 'https://cors-anywhere.herokuapp.com/';
			let url = "http://blogs.nasa.gov/stationreport/feed/";
			
			let xhttp = new XMLHttpRequest();
			xhttp.open("GET", proxy + url, true);
			xhttp.send();

			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let rss = this.responseXML;
					parseRSS(rss); 
				}
			}
}

function parseRSS(rss) {
	let items = rss.getElementsByTagName("item");
	let rssContent = "";

	for (let i = 0; i< items.length; i++) {
		let nodes = items[i].children;

		let title, pubdate, description, link;
		for (let j = 0; j < nodes.length; j++) {
			if (nodes[j].tagName == "title") {
				title = nodes[j].childNodes[0].nodeValue;
			}	else if (nodes[j].tagName == "link") {
				link = nodes[j].childNodes[0].nodeValue;
			}	else if (nodes[j].tagName == "description") {
				description = nodes[j].childNodes[0].nodeValue;
			}	else if (nodes[j].tagName == "pubDate") {
				pubdate = nodes[j].childNodes[0].nodeValue;
			}
		}
		
		rssContent += `<div class="rss-element">
							<h3>${title}</h3>
							<p>${description}</p>
							<p><a style="font-style: italic;" href="${link}">${pubdate}</a></p>
						</div>`	
	}
	
	document.getElementById("rss-section-id").innerHTML = rssContent;
}