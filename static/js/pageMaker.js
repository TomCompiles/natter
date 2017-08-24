var allArticles = [
	{ "title":"Natter", "genre":"Testing", "date":"22/08/2017", "imgSRC":"http://via.placeholder.com/300x200", "videoSRC":"https://s3.eu-west-2.amazonaws.com/natter-london.com/Natter+warm+up.mp4", "shortDesc":"BLAAAAAGH", "longDesc":"BLAAAAAAAAAAAAAAAGH", "placeTimes":["0:00","0:02","0:05"], "placeDesc":["Visit this BLAGH","0","0"]},
	{ "title":"Natter", "genre":"Testing", "date":"22/08/2017", "imgSRC":"http://via.placeholder.com/300x200", "videoSRC":"https://s3.eu-west-2.amazonaws.com/natter-london.com/Natter+warm+up.mp4", "shortDesc":"BLAAAAAGH", "longDesc":"BLAAAAAAAAAAAAAAAGH", "placeTimes":["0:00","0:02","0:05"], "placeDesc":["Visit this BLAGH","0","0"]}
]


var type;
var articleNo;
function initialise(inType = "home"){
	articleNo = 0;
	var articleList = [];
	type = inType;
	if(type=="home"){
		articleList = searchArticles(allArticles, 0, "N/A");
	} else {
		articleList = searchArticles(allArticles, 1, type);
	}
	/*criteria:
	0 - date
	1 - genre
	
	This entire method will put together the list of articles we'll actually be using for the other methods
	if(type == something){
		for(x = 0; x < allArticles.length; x++){
			if(type == 0){
				searchCriteria  = 
			}
		}
	} Type is the tab/page we're in - top stories, reccomendations etc
	*/
	displayList(articleList);
	/*if(type == somethingOrAnother){
		displayVoxPops();
	}*/
}
function searchArticles(allArticles, criteria, value){
	var articleList =[];
	if(criteria==0){
		for(var i = 0; i < allArticles.length; i++){
			articleList.push(allArticles[i]);
		}
	} else {
		for(var i = 0; i < allArticles.length; i++){
			if(allArticles[i].genre == value){
				articleList.push(allArticles[i]);
			}
		}
	}
	return articleList;
}
function displayList(articleList){
	//TODO How many items per page?
	var noOfItems = (type=="home") ? articleList.length-1:articleList.length;

	for(; articleNo < noOfItems; articleNo++){
		article = articleList[articleNo];
		//Clone the template with all its children
		var newNode = document.getElementById("Template").cloneNode(true);
		newNode.style = document.getElementById("Template").style;
		//Grabs the actual card
		var card = newNode.children[0].children[0].children[0];
		//Sets the icon for the article to the one linked in the JSON
		card.children[0].src = article.imgSRC;
		card.children[1].children[0].innerHTML = article.genre + " &#8226; " + article.date;
		card.children[1].children[1].innerHTML = article.title;
		card.children[1].children[2].innerHTML = article.shortDesc;
		document.getElementById("main-view").insertBefore(newNode,document.getElementById("main-view").children[document.getElementById("main-view").children.length]);
	}

	if(type = "home"){
		//Creates the Latest thing on the bottom
		article = articleList[articleNo];
		//Clone the template with all its children
		console.log(article);
		var newNode = document.getElementById("Template").cloneNode(true);
		newNode.style = document.getElementById("Template").style;
		newNode.className += " last";
		var latestHeader = document.createElement("h4");
		newNode.children[0].children[0].prepend(latestHeader);
		//Grabs the actual card
		var card = newNode.children[0].children[0].children[1];
		//Sets the icon for the article to the one linked in the JSON
		card.children[0].src = article.imgSRC;
		card.children[1].children[0].innerHTML = article.genre + " &#8226; " + article.date;
		card.children[1].children[1].innerHTML = article.title;
		card.children[1].children[2].innerHTML = article.shortDesc;
		document.getElementById("main-view").insertBefore(newNode,document.getElementById("main-view").children[document.getElementById("main-view").children.length]);
	}
}
function displayVoxPops(pictureList){
	//TODO How many items on a carousel?
	for(var i = 0; i < pictureList.length; i++){
		picture = pictureList[i];
		var area = document.getElementById("vptemplate").cloneNode(true);
		area.style = document.getElementById("vptemplate").style;
		var container = area.children[0].children[0].lastChild;
		var newDiv = document.createElement("div");
		var newImg = document.createElement("img");
		newImg.className = "voxpop-item";
		newImg.src = picture.imgSRC;
		newDiv.appendChild(newImg);
		container.append(newDiv);
	}
}

initialise();