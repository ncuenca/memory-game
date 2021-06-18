"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);
var flipped = null;
var pairs = 0;
createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - an click listener for each card to handleCardClick
 */

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    let currClass = "" + color;
    let currDiv = document.createElement("div");
    currDiv.className = currClass;
    currDiv.addEventListener("click", handleCardClick);
    gameBoard.appendChild(currDiv);
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.style.backgroundColor = card.className;
  card.id = "flipped";
  card.removeEventListener("click", handleCardClick);
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.style.backgroundColor = "white";
  card.id = "";
  card.addEventListener("click", handleCardClick);
}

/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(evt) {
  let cards = document.getElementById("game").getElementsByTagName("div")

  if (evt.target.id != "matched" & flipped != evt.target) {
    flipCard(evt.target);
    setTimeout(function() {
      if (pairs == 5) {
        alert("You win!");
        pairs++;
      }
    }, FOUND_MATCH_WAIT_MSECS);
    if (flipped) {
      if (flipped.className == evt.target.className) {
        flipped.id = "matched";
        evt.target.id = "matched";
        pairs++;
        flipped = null;
      }
      else {
        timeoutCards(cards);
        setTimeout(function() {
          unFlipCard(evt.target);
          unFlipCard(flipped);
          flipped = null;
          timeinCards(cards);
        }, FOUND_MATCH_WAIT_MSECS);
      }

    }
    else {
      flipped = evt.target;
    }
  }
  
}

function timeoutCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    cards[i].removeEventListener("click", handleCardClick);
  }

}

function timeinCards(cards) {
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", handleCardClick);
  }
}

