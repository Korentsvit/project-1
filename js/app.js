var cards = ["queen", "queen", "king", "king"];

var cardsInPlay = [],
 cardsInPlayIds = [];

// function to mix elements in array

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// reset images
var resetCards = function(){
  var cardsDivs = document.getElementsByClassName("card");
  for (var i = 0; i < cardsDivs.length; i++){
    cardsDivs[i].innerHTML = '';
  }
};

// cards click handler / game logic
var isTwoCards = function() {
  var dataCard = this.getAttribute('data-card');
  var dataId = this.getAttribute('data-id');

  if (cardsInPlay.length === 1 && cardsInPlayIds[0] === dataId) {
    return;
  }
  // add card to array of cards in play
  cardsInPlay.push(dataCard);
  cardsInPlayIds.push(dataId);

  // check which card user clicked
  // show image depending on card data: king or queen
  if (dataCard === 'king') {
    this.innerHTML = '<img src="http://i.imgur.com/o8too82.png">';
  } else {
    this.innerHTML = '<img src="http://i.imgur.com/jWQ9eke.jpg">';
  }

  // if you have two cards in play check for a match
  if (cardsInPlay.length === 2) {

    // pass the cardsInPlay as an argument to isMatch function
    // isMatch function check cards chosen by user and show reaults in popup
    var isMatched = isMatch(cardsInPlay);

    // clear cards in play array for next try
    cardsInPlay = [];
    cardsInPlayIds = [];

    // hide result message after 1 second
    var infoBox = document.getElementById("info-box");
    setTimeout(function(){
      // hide cards images
      resetCards();

      // hide popup message
      infoBox.innerHTML = '';
      infoBox.display = 'none';

      // start new game if use won current game
      // in new gamee we mix cards
      if (isMatched){
        createBoard();
      }
    }, 1000);
  }
};

// check are chosen cards are same or now
// show message depending on comparison result
var isMatch = function(cards) {
  var infoBox = document.getElementById("info-box");
  // show information block
  infoBox.style.display = 'block';

  if (cards[0] === cards[1]) {
    infoBox.innerHTML = 'You found a match!';
    return true;
  } else {
    infoBox.innerHTML = 'Sorry, try again.';
    return false;
  }
};

// create new game with cards from "cards" array
// before creating game we fix cards using function shuffle
var createBoard = function() {
  var board = document.getElementById("game-board");
  board.innerHTML = '';
  cards = shuffle(cards);
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.setAttribute('data-card', cards[i]);
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', isTwoCards);
    board.appendChild(cardElement);
  }
};

createBoard();
