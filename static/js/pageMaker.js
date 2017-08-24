var type;
var articleNo;
function initialise(type){
	type = 0;
	articleNo = 0;
	var articleList;
	//This entire method will put together the list of articles we'll actually be using for the other methods
	/*if(type == something){
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

function displayList(articleList){
	//TODO How many items per page?
	for(; articleNo < articleList.length-1; articleNo++){
		article = articleList[articleNo];
		//Clone the template with all its children
		var newNode = document.getElementByID("Template").cloneNode(true);
		//Grabs the actual card
		var card = newNode.firstChild.firstChild.firstChild;
		//Sets the icon for the article to the one linked in the JSON
		card.children[0].src = article.imgSRC;
		card.children[1].children[0].innerHTML = article.genre + " &#8226; " + article.date;
		card.children[1].children[1].innerHTML = article.title;
		card.children[1].children[2].innerHTML = article.shortDesc;
	}
	//Creates the Latest thing on the bottom
	article = articleList[articleNo];
	//Clone the template with all its children
	var newNode = document.getElementByID("Template").cloneNode(true);
	var latestHeader = document.createElement("h4");
	newNode.firstChild.firstChild.prepend(latestHeader);
	//Grabs the actual card
	var card = newNode.firstChild.firstChild.firstChild;
	//Sets the icon for the article to the one linked in the JSON
	card.children[0].src = article.imgSRC;
	card.children[1].children[0].innerHTML = article.genre + " &#8226; " + article.date;
	card.children[1].children[1].innerHTML = article.title;
	card.children[1].children[2].innerHTML = article.shortDesc;
}

function displayVoxPops(pictureList){
	//TODO How many items on a carousel?
	for(var i = 0; i < pictureList.length; i++){
		picture = pictureList[i];
		var area = document.getElementByID("vptemplate").cloneNode(true);
		var container = area.firstChild.firstChild.lastChild;
		var newDiv = document.createElement("div");
		var newImg = document.createElement("img");
		newImg.class = "voxpop-item";
		newImg.src = picture.imgSRC;
	}
}


