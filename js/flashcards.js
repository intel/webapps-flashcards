/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the 
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

/**
 * globals
 */
var getMessage,
    license_init,
    GameSound,
    window,
    document;

/**
* Flashcards() class contains all the variables and functions needed to run the flash card game 
*  @constructor
*/
var FlashCards = function () {
    "use strict";
    this.cardCount = 0; //current game wrong answers 
    this.rightCount = 0; //current game right answers 
    this.cardSet = "FlashCardSet-Color"; //name of card set and file prefix
    this.endGameFlag = false; //endGame flag
    this.deckAnswer = []; //the array of answers for this deck
};

/**
 *  Flashcards.helpClicked() plays audio and makes the help card dialog visible when help icon is clicked 
 *  @private
 */
FlashCards.prototype.helpClicked = function () {
    "use strict";
    this.buttonClickSound.play();

    document.getElementById("help-close").style.display = "inline";
    document.getElementById("help-text").style.display = "inline";
    document.getElementById("smoke-screen").style.display = "inline";
    document.getElementById("help-card").style.display = "inline";
};

/* 
 * Flashcards.helpCloseClicked() plays audio and makes the help card dialog invisible when help X icon is clicked 
 * @private
 */
FlashCards.prototype.helpCloseClicked = function () {
    "use strict";
    this.buttonClickSound.play();
    document.getElementById("help-close").style.display = "none";
    document.getElementById("smoke-screen").style.display = "none";
    document.getElementById("help-card").style.display = "none";
    document.getElementById("help-text").style.display = "none";
};

 /** 
 * Flashcards.hideAnswer() will hide the wrong and right buttons and answer text reseting the cursor style
 * @private
 */
FlashCards.prototype.hideAnswer = function () {
    "use strict";
    document.getElementById("wrong-button").style.display = "none";
    document.getElementById("right-button").style.display = "none";
    document.getElementById("card-answer").style.opacity = "0";
    document.getElementById("card").style.cursor = "pointer";
    document.getElementById("card-answer").style.cursor = "pointer";
};

/** 
 * Flashcards.clear() will reset game counters, hide stars, replay button, answers, and reset the score
 * @private
 */
FlashCards.prototype.clear = function () {
    "use strict";
    var parent = document.getElementById("screen-nav"),
        count,
        children;

    //reset properties
    this.endGameFlag = false;
    this.rightCount = 0;
    this.cardCount = 0;

    //remove all stars from dom
    children = document.getElementsByClassName("star");
    for (count = children.length - 1; count >= 0; count = count - 1) {
        parent.removeChild(document.getElementsByClassName("star")[count]);
    }

    document.getElementById("score-number").innerHTML = ": 0";
    document.getElementById("replay-button").style.display = "none";
    this.hideAnswer();
};

/**
 *  Flashcards.navPaneToggle() opens or closes nav pane and plays nav pane sound effect
 * @private
 */
FlashCards.prototype.navPaneToggle = function () {
    "use strict";
    this.swooshSound.play();
    if (document.getElementById("nav-pane-animation-open")) {
        document.getElementById("nav-pane-animation-open").setAttribute("id", "nav-pane-animation-close");
    } else {
        document.getElementById("nav-pane-animation-close").setAttribute("id", "nav-pane-animation-open");
    }
};

/**
 *  Flashcards.navPaneClicked() plays button click audio, opens or closes nav pane and plays nav pane sound effect
 * @private
 */
FlashCards.prototype.navPaneClicked = function () {
    "use strict";
    this.buttonClickSound.play();
    this.navPaneToggle();
};

/**
 *  Flashcards.getShapeDeckAnswers() will call getMessage to get the localized answers for this deck 
 *  @private
 */
FlashCards.prototype.getShapeDeckAnswers = function () {
    "use strict";
    this.shapeAnswer = [];
    this.shapeAnswer[0] = getMessage("circle");
    this.shapeAnswer[1] = getMessage("square");
    this.shapeAnswer[2] = getMessage("triangle");
    this.shapeAnswer[3] = getMessage("oval");
    this.shapeAnswer[4] = getMessage("star");
    this.shapeAnswer[5] = getMessage("octagon");
    this.shapeAnswer[6] = getMessage("rectangle");
    this.shapeAnswer[7] = getMessage("trapezoid");
};

/**
 *  Flashcards.shapeDeckClicked() set the game to play through the this deck
 * @private
 */
FlashCards.prototype.setShapeDeck = function () {
    "use strict";
    this.whipCrackSound.play();
    this.clear();
    this.cardSet = "FlashCardSet-Shapes";
    this.deckAnswer = this.shapeAnswer;
    document.getElementById("card-title").innerHTML = getMessage("shapes");
    document.getElementById("card-answer").style.color = "#499aff";
    document.getElementById("card").style.backgroundImage = "url('images/" + this.cardSet + '_' + (this.cardCount) + ".png')";
    document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
    document.getElementById("card").innerHTML = '';
};

/** 
 * Flashcards.shapeDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
 * @private
 */
FlashCards.prototype.shapeDeckClicked = function () {
    "use strict";
    this.buttonClickSound.play();
    this.navPaneClicked();
    this.setShapeDeck();
};

/**
 *  Flashcards.getCountingDeckAnswers() will call getMessage to get the localized answers for this deck 
 *  @private
 */
FlashCards.prototype.getCountingDeckAnswers = function () {
    "use strict";
    this.countingAnswer = [];
    this.countingAnswer[0] = getMessage("one");
    this.countingAnswer[1] = getMessage("two");
    this.countingAnswer[2] = getMessage("three");
    this.countingAnswer[3] = getMessage("four");
    this.countingAnswer[4] = getMessage("five");
    this.countingAnswer[5] = getMessage("six");
    this.countingAnswer[6] = getMessage("seven");
    this.countingAnswer[7] = getMessage("eight");
    this.countingAnswer[8] = getMessage("nine");
    this.countingAnswer[9] = getMessage("ten");
};

/**
 *  Flashcards.countingDeckClicked() set the game to play through the this deck 
 *  @private
 */
FlashCards.prototype.setCountingDeck = function () {
    "use strict";
    this.whipCrackSound.play();
    this.clear();
    this.cardSet = "FlashCardSet-Counting";
    this.deckAnswer = this.countingAnswer;
    document.getElementById("card-title").innerHTML = getMessage("counting");
    document.getElementById("card-answer").style.color = "navy";
    document.getElementById("card").style.backgroundImage = "url('images/" + this.cardSet + '_' + this.cardCount + ".png')";
    document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
    document.getElementById("card").innerHTML = '';
};

/**
 * Flashcards.countingDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck
 * @private
 */
FlashCards.prototype.countingDeckClicked = function () {
    "use strict";
    this.buttonClickSound.play();
    this.navPaneClicked();
    this.setCountingDeck();
};

/**
 *  Flashcards.getSpanishDeckAnswers() will call getMessage to get the localized answers for this deck 
 *  @private
 */
FlashCards.prototype.getSpanishDeckAnswers = function () {
    "use strict";
    this.spanishAnswer = [];
    this.spanishAnswer[0] = getMessage("sun");
    this.spanishAnswer[1] = getMessage("cloud");
    this.spanishAnswer[2] = getMessage("cat");
    this.spanishAnswer[3] = getMessage("dog");
    this.spanishAnswer[4] = getMessage("tree");
    this.spanishAnswer[5] = getMessage("fish");
    this.spanishAnswer[6] = getMessage("fruit");
    this.spanishAnswer[7] = getMessage("worm");
    this.spanishAnswer[8] = getMessage("bird");
    this.spanishAnswer[9] = getMessage("crocodile");
    this.spanishAnswer[10] = getMessage("book");
    this.spanishAnswer[11] = getMessage("socks");
    this.spanishAnswer[12] = getMessage("cup");
    this.spanishAnswer[13] = getMessage("chair");
};

/**
 * Flashcards.spanishDeckClicked() set the game to play through the this deck
 * @private
 */
FlashCards.prototype.setSpanishDeck = function () {
    "use strict";
    this.whipCrackSound.play();
    this.clear();
    this.cardSet = "FlashCardSet-Spanish";
    this.deckAnswer = this.spanishAnswer;
    document.getElementById("card-title").innerHTML = getMessage("spanish");
    document.getElementById("card-answer").style.color = "#000000";
    document.getElementById("card").style.backgroundImage = "url('images/" + this.cardSet + '_' + this.cardCount + ".png')";
    document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
    document.getElementById("card").innerHTML = '';
};

/**
 *  Flashcards.spanishDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
 *  @private
 */
FlashCards.prototype.spanishDeckClicked = function () {
    "use strict";
    this.buttonClickSound.play();
    this.navPaneClicked();
    this.setSpanishDeck();
};

/**
 *  Flashcards.getColorDeckAnswers() will call getMessage to get the localized answers for this deck 
 *  @private
 */
FlashCards.prototype.getColorDeckAnswers = function () {
    "use strict";
    this.colorAnswer = [];
    this.colorAnswer[0] = getMessage("red");
    this.colorAnswer[1] = getMessage("purple");
    this.colorAnswer[2] = getMessage("blue");
    this.colorAnswer[3] = getMessage("green");
    this.colorAnswer[4] = getMessage("orange");
    this.colorAnswer[5] = getMessage("yellow");
};

/**
 *  Flashcards.getColorDeckColors() will set the text colors for each card in this deck 
 * @private
 */
FlashCards.prototype.getColorDeckColors = function () {
    "use strict";
    this.colorHex = [];
    this.colorHex[0] = "#dd0000";
    this.colorHex[1] = "#7e0b80";
    this.colorHex[2] = "#0000ff";
    this.colorHex[3] = "#33cc33";
    this.colorHex[4] = "#cc9933";
    this.colorHex[5] = "#fef600";
};

/** 
 * Flashcards.colorDeckClicked() set the game to play through the this deck
 * @private
 */
FlashCards.prototype.setColorDeck = function () {
    "use strict";
    this.whipCrackSound.play();
    this.clear();
    this.cardSet = "FlashCardSet-Color";
    this.deckAnswer = this.colorAnswer;
    document.getElementById("card-title").innerHTML = getMessage("colors");
    document.getElementById("card").style.backgroundImage = "url('images/" + this.cardSet + '_' + this.cardCount + ".png')";
    document.getElementById("card-answer").innerHTML = this.colorAnswer[this.cardCount];
    document.getElementById("card-answer").style.color = this.colorHex[this.cardCount];
    document.getElementById("card").innerHTML =	'';
};

/**
 *  Flashcards.colorDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
 * @private
 */
FlashCards.prototype.colorDeckClicked = function () {
    "use strict";
    this.buttonClickSound.play();
    this.navPaneClicked();
    this.setColorDeck();
};

/** 
 * Flashcards.initNav() gets the localized strings for the game play screen, sets the default deck to Shapes
 * @private
 */
FlashCards.prototype.initNav = function () {
    "use strict";
    this.backgroundSound.play();
    document.getElementById("score-text").innerHTML = getMessage("scoreText");
    document.getElementById("score-number").innerHTML = ": 0";
    document.getElementById("card-title").innerHTML = getMessage("shapes");

    this.getColorDeckAnswers();
    this.getColorDeckColors();
    this.getShapeDeckAnswers();
    this.getCountingDeckAnswers();
    this.getSpanishDeckAnswers();

    this.setShapeDeck();
};

/**
 *  Flashcards.playNowClicked() will initialize the game screen when Play Now button is clicked and hide the splash screen 
 * @private
 */
FlashCards.prototype.playNowClicked = function () {
    "use strict";
    this.initNav();
    document.getElementById("screen").style.display = "none";
    document.getElementById("screen-nav").style.display = "inline";
};

/**
 * Flashcards.isLastCard() 
 * @private
 * @return true if card count is equal to the number of cards in the deck, else return false
 */
FlashCards.prototype.isLastCard = function () {
    "use strict";
    if ((this.deckAnswer.length) === this.cardCount) {
        return true;
    }
    return false;
};

/**
 * Flashcards.drawStars() draws the stars for right and wrong answers
 * @private
 */
FlashCards.prototype.drawStars = function () {
    "use strict";
    var star,
        count,
        container;

    //paint correct stars equal to rightCount
    for (count = 1; count <= this.rightCount; count = count + 1) {
        star = document.createElement("img");
        star.setAttribute('src', 'images/StarFilled.png');
        star.setAttribute('id', ('star' + count));
        star.setAttribute('class', ('star'));
        container = document.getElementById("screen-nav");
        container.appendChild(star);
    }

    //paint remaining stars as empty stars
    for (count = (this.rightCount + 1); count <= (this.deckAnswer.length); count = count + 1) {
        star = document.createElement("img");
        star.setAttribute('src', 'images/StarEmpty.png');
        star.setAttribute('id', ('star' + count));
        star.setAttribute('class', ('star'));
        container = document.getElementById("screen-nav");
        container.appendChild(star);
    }
};

 /**
 * Flashcards.endGame() opens nav pane, plays audio sound for end of game, shows correct star score and replay button
 * @private
 */
FlashCards.prototype.endGame = function () {
    "use strict";
    this.trumpetFanfareSound.play();
    this.endGameFlag = true;

    this.navPaneToggle();
    document.getElementById("card-flip").setAttribute("id", "current-card");
    document.getElementById("card").style.backgroundImage = "url('images/BlankCard.png')";

    this.drawStars();

    //if user got more right than wrong then show localized strings for "good job" else show localized strings for "try again" 
    if (((this.deckAnswer.length) - this.rightCount) < this.rightCount) {
        document.getElementById("card-answer").innerHTML = getMessage("goodJob");
    } else {
        document.getElementById("card-answer").innerHTML = getMessage("tryAgain");
    }

    //set card answer color and display replay button
    document.getElementById("card-answer").style.color = "#499aff";
    document.getElementById("card-answer").style.opacity = "1";
    document.getElementById("replay-button").style.display = "inline";
};

/**
 * Flashcards.flipCard() hide answers and moves to next card in the deck, increments counters and checks for end game state
 * @private
 */
FlashCards.prototype.flipCard = function () {
    "use strict";
    this.hideAnswer();
    document.getElementById("current-card").setAttribute("id", "card-flip");
    this.cardCount = this.cardCount + 1;
    if (!this.isLastCard()) {
        this.cardFlipSound.play();
        document.getElementById("card").style.backgroundImage = "url('images/" + this.cardSet + '_' + this.cardCount + ".png')";
        document.getElementById("card-answer").innerHTML = this.deckAnswer[this.cardCount];
        if (this.cardSet === "FlashCardSet-Color") {
            document.getElementById("card-answer").style.color = this.deckAnswer[this.cardCount];
        }
        document.getElementById("card-flip").setAttribute("id", "current-card");
    } else {
        this.endGame();
    }
};

/**
 * Flashcards.wrongButtonClicked() plays audio sounds, increments wrongCount and calls flipCard()
 * @private
 */
FlashCards.prototype.wrongButtonClicked = function () {
    "use strict";
    this.wrongAnswerSound.play();
    this.buttonClickSound.play();
    this.flipCard();
};

/**
 * Flashcards.rightButtonClicked() plays audio sounds, increments rightCount and calls flipCard()
 * @private
 */
FlashCards.prototype.rightButtonClicked = function () {
    "use strict";
    this.rightAnswerSound.play();
    this.buttonClickSound.play();
    this.rightCount = this.rightCount + 1;
    this.flipCard();
    document.getElementById("score-number").innerHTML = ": " + this.rightCount;
};

/**
 * Flashcards.replayButtonClicked() restarts current game and calls clear()
 * @private
 */
FlashCards.prototype.replayButtonClicked = function () {
    "use strict";
    if (this.cardSet === "FlashCardSet-Color") {
        this.colorDeckClicked();
    } else if (this.cardSet === "FlashCardSet-Shapes") {
        this.shapeDeckClicked();
    } else if (this.cardSet === "FlashCardSet-Spanish") {
        this.spanishDeckClicked();
    } else if (this.cardSet === "FlashCardSet-Counting") {
        this.countingDeckClicked();
    }
    this.clear();
};

/**
 * Flashcards.showAnswer() will show right and wrong buttons, answer and set cursor type
 * @private
 */
FlashCards.prototype.showAnswer = function () {
    "use strict";
    document.getElementById("wrong-button").style.display = "inline";
    document.getElementById("right-button").style.display = "inline";
    document.getElementById("card-answer").style.opacity = "1";
    document.getElementById("card").style.cursor = "default";
    document.getElementById("card-answer").style.cursor = "default";
};

/**
 * Flashcards.cardClicked() plays button click sound, makes sure the nav pane is closed, and if not end game state will call showAnswer()
 * @private
 */
FlashCards.prototype.cardClicked = function () {
    "use strict";
    this.buttonClickSound.play();
    if (document.getElementById("nav-pane-animation-open")) {
        this.swooshSound.play();
        document.getElementById("nav-pane-animation-open").setAttribute("id", "nav-pane-animation-close");
    }

    if (!this.endGameFlag) {
        this.showAnswer();
    }
};

/**
* Flashcards.scrollNavPane will scroll the navigation Pane the direction the user moves the mouse
* @private
*/
FlashCards.prototype.scrollNavPane = function (delta) {
    document.getElementById("shapes-deck").style.webkitTransform = "translateY("+delta+"px)";
    document.getElementById("color-deck").style.webkitTransform = "translateY("+delta+"px)";
    document.getElementById("counting-deck").style.webkitTransform = "translateY("+delta+"px)";
    document.getElementById("spanish-deck").style.webkitTransform = "translateY("+delta+"px)";
};

/**
 * Flashcards.cardClicked() plays button click sound, makes sure the nav pane is closed, and if not end game state will call showAnswer()
 * @private
 */
FlashCards.prototype.setEventListeners = function () {
    "use strict";
    var self = this,
        starty = 0, //starting y coordinate of drag
        isDrag = -1; //flag for qualifying drag event
    document.getElementById("play-button").addEventListener('click', function () {
        self.playNowClicked();
    }, false);
    document.getElementById("nav-pane").addEventListener('click', function () {
        self.navPaneClicked();
    }, false);
    document.getElementById("clear-scroll").addEventListener('mousedown', function (e) {
        starty = e.clientY;
        isDrag = 0; //mouse down
    }, false);
     document.getElementById("clear-scroll").addEventListener('mousemove', function (e) {
        isDrag = 1; //mouse move
    }, false);
     document.getElementById("clear-scroll").addEventListener('mouseup', function (e) {
        if(isDrag === 1) { //if equals 1 is drag event
            self.scrollNavPane((-1)*(starty-e.clientY));
        }
        isDrag = -1; //regardless reset endy 
    }, false);
    document.getElementById("shapes-deck").addEventListener('click', function () {
        self.shapeDeckClicked();
    }, false);
    document.getElementById("color-deck").addEventListener('click', function () {
        self.colorDeckClicked();
    }, false);
    document.getElementById("counting-deck").addEventListener('click', function () {
        self.countingDeckClicked();
    }, false);
    document.getElementById("spanish-deck").addEventListener('click', function () {
        self.spanishDeckClicked();
    }, false);
    document.getElementById("card").addEventListener('click', function () {
        self.cardClicked();
    }, false);
    document.getElementById("card-answer").addEventListener('click', function () {
        self.cardClicked();
    }, false);
    document.getElementById("wrong-button").addEventListener('click', function () {
        self.wrongButtonClicked();
    }, false);
    document.getElementById("right-button").addEventListener('click', function () {
        self.rightButtonClicked();
    }, false);
    document.getElementById("replay-button").addEventListener('click', function () {
        self.replayButtonClicked();
    }, false);
    document.getElementById("help-icon").addEventListener('click', function () {
        self.helpClicked();
    }, false);
    document.getElementById("help-close").addEventListener('click', function () {
        self.helpCloseClicked();
    }, false);
};

/**
* Flashcards.initSound will initialize all the sound id's for each sound file 
* @private
*/
FlashCards.prototype.initSound = function () {
    "use strict";
    this.buttonClickSound = new GameSound("sound-buttonclick");
    this.adventureThemeSound = new GameSound("sound-intro", true);
    this.cardFlipSound = new GameSound("sound-cardflip");
    this.backgroundSound = new GameSound("sound-background", true);
    this.swooshSound = new GameSound("sound-navpane");
    this.trumpetFanfareSound = new GameSound("sound-end");
    this.rightAnswerSound = new GameSound("sound-starbutton");
    this.wrongAnswerSound = new GameSound("sound-thumbbutton");
    this.whipCrackSound = new GameSound("sound-begin");
};

/**
* Flashcards.init() will set the license, play intro sound, and set splash screen text 
* @private
*/
FlashCards.prototype.init = function () {
    "use strict";
    license_init("license", "screen");
    this.initSound();
    this.adventureThemeSound.play();
    document.getElementById("app-name").innerHTML = getMessage("appName");
    document.getElementById("adventure-text").innerHTML = getMessage("adventureText");
    document.getElementById("cards-text").innerHTML = getMessage("cardsText");
    document.getElementById("play-button-text").innerHTML = getMessage("playButtonText");
    document.getElementById("screen-nav").style.display = "none";
    this.setEventListeners();
};

window.addEventListener('load', function () {
    "use strict";
    var App = new FlashCards();
    App.init();
    //hack to get active state to work on webkit
    this.touchstart = function (e) {};
}, false);
