var DeckOfCardApp = {};

DeckOfCardApp.cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
DeckOfCardApp.suits = ["Diamonds", "Hearts", "Spades","Clubs"];
DeckOfCardApp.deckOfCards = new Array();
DeckOfCardApp.drawnCards = new Array();

DeckOfCardApp.getDeckOfCards = function(){
	DeckOfCardApp.deckOfCards = new Array();

	for(var i = 0; i < DeckOfCardApp.suits.length; i++)
	{
		for(var x = 0; x < DeckOfCardApp.cards.length; x++)
		{
			var rank = i + x;
			var card = {Value: DeckOfCardApp.cards[x], Suit: DeckOfCardApp.suits[i], Rank: rank};
			DeckOfCardApp.deckOfCards.push(card);
		}
	}

	return DeckOfCardApp.deckOfCards;
};

DeckOfCardApp.shuffleCards = function(deck){
	// for 500 turns
	// switch the values of two random cards
	for (var i = 0; i < 5000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
	}
};

DeckOfCardApp.renderCards = function(deckCOntainer,deck){
	document.getElementById(deckCOntainer).innerHTML = "";
	for(var i = 0; i < deck.length; i++)
	{
		var card = document.createElement("div");
		var value = document.createElement("div");
		var suit = document.createElement("div");
		card.className = "card";
		value.className = "value";
		suit.className = "suit " + deck[i].Suit;
		value.innerHTML = deck[i].Value;
		card.appendChild(value);
		card.appendChild(suit);

		document.getElementById(deckCOntainer).appendChild(card);
	}
};

DeckOfCardApp.loadCards = function(){
	deck = DeckOfCardApp.getDeckOfCards();
	DeckOfCardApp.shuffleCards(deck);
	DeckOfCardApp.renderCards("deck",deck);
	document.getElementById("reset").disabled = true;
	document.getElementById("reset").setAttribute("disabled", true);
	document.getElementById("sort").disabled = true;
	document.getElementById("sort").setAttribute("disabled", true);
};

DeckOfCardApp.drawCards = function(){
	drawnCards = new Array();
	var number = document.getElementById("no_of_cards").value;
	if(number === ""){
		alert("Please enter a correct value");
		return false;
	}
	if(number > deck.length){
		alert("Please put value less or eqaul to "+ deck.length);
	}else{
			DeckOfCardApp.drawnCards = deck.splice((deck.length-number), number);
			DeckOfCardApp.renderCards("deck",deck);
			DeckOfCardApp.renderCards("drawn_cards_container", DeckOfCardApp.drawnCards);
			document.getElementById("no_of_cards").value = "";
			document.getElementById("reset").disabled = false;
			document.getElementById("reset").removeAttribute("disabled");
			document.getElementById("sort").disabled = false;
			document.getElementById("sort").removeAttribute("disabled");
	}	
};

DeckOfCardApp.resetCards = function(){
		DeckOfCardApp.loadCards();
		DeckOfCardApp.drawnCards.length = 0;
		document.getElementById("drawn_cards_container").innerHTML = "";
};
DeckOfCardApp.sortDrawnCards = function (){
	if(DeckOfCardApp.drawnCards.length > 0){
		DeckOfCardApp.drawnCards.sort(function(a, b){return b.Rank - a.Rank});
		DeckOfCardApp.renderCards("drawn_cards_container", DeckOfCardApp.drawnCards);
	}
};	

window.onload = DeckOfCardApp.loadCards;

