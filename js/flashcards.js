/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the 
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

/* global */
var GameSound,
    license_init,
    getMessage;

/**
* Flashcards() class contains all the variables and functions needed to run the flash card game 
*/
var FlashCardApp = function () {
    "use strict";
    var sound_buttonclick = new GameSound("sound-buttonclick"), //button clicks 
        sound_intro = new GameSound("sound-intro", true), //intro theme song
        sound_cardflip = new GameSound("sound-cardflip"), //card flip 
        sound_background = new GameSound("sound-background", true), //background birds chirping 
        sound_navpane = new GameSound("sound-navpane"), //nav pane swoosh
        sound_end = new GameSound("sound-end"), //trumpets fanfare end game
        sound_starbutton = new GameSound("sound-starbutton"), //right answer
        sound_thumbbutton = new GameSound("sound-thumbbutton"), //wrong answer 
        sound_begin = new GameSound("sound-begin"), //whip crack game begin
        wrongCount = 0, //current game wrong answers 
        rightCount = 0, //current game right answers 
        cardSet = "FlashCardSet-Color_", //name of card set and file prefix
        cardCount = 0, //cards in selected deck
        lastCard = 0, //last card number in selected deck
        endGameFlag = false, //last card in selected deck is in play
        colorHex = [], //holds color values for text used in the color deck
        deckAnswer = [], //holds answers for selected deck
        colorAnswer = [], //holds answers for color deck
        shapeAnswer = [], //holds answers for shape deck
        numAnswer = [], //holds answers for counting deck
        spanishAnswer = []; //holds answers for spanish color deck

    /**
     *  Flashcards.helpClicked() plays audio and makes the help card dialog visible when help icon is clicked 
     */
    function helpClicked() {
        sound_buttonclick.play();
        document.getElementById("help_close").style.display = "inline";
        document.getElementById("help_text").style.display = "inline";
        document.getElementById("smoke_screen").style.display = "inline";
        document.getElementById("help_card").style.display = "inline";
    }

    /* 
     * Flashcards.helpCloseClicked() plays audio and makes the help card dialog invisible when help X icon is clicked 
     */
    function helpCloseClicked() {
        sound_buttonclick.play();
        document.getElementById("help_close").style.display = "none";
        document.getElementById("smoke_screen").style.display = "none";
        document.getElementById("help_card").style.display = "none";
        document.getElementById("help_text").style.display = "none";
    }

     /* 
     * Flashcards.hideAnswer() will hide the wrong and right buttons and answer text reseting the cursor style
     */
    function hideAnswer() {
        document.getElementById("wrong-button").style.display = "none";
        document.getElementById("right-button").style.display = "none";
        document.getElementById("card-answer").style.opacity = "0";
        document.getElementById("card").style.cursor = "pointer";
        document.getElementById("card-answer").style.cursor = "pointer";
    }

    /* 
     * Flashcards.clear() will reset game counters, hide stars, replay button, answers, and reset the score
     */
    function clear() {
        endGameFlag = false;
        rightCount = 0;
        wrongCount = 0;
        cardCount = 0;
        var parent = document.getElementById("screen-nav"),
            count,
            children;
        document.getElementById("score-text").innerHTML = getMessage("score_text") + ": " + "0";
        children = document.getElementsByClassName("star");
        for (count = children.length - 1; count >= 0; count = count - 1) {
            parent.removeChild(document.getElementsByClassName("star")[count]);
        }
        document.getElementById("replay-button").style.display = "none";
        hideAnswer();
    }

    /**
     *  Flashcards.navPaneClicked() plays button click audio, opens or closes nav pane and plays nav pane sound effect
     */
    function navPaneClicked() {
        sound_buttonclick.play();
        if (document.getElementById("nav-pane-animation-open")) {
            document.getElementById("nav-pane-animation-open").setAttribute("id", "nav-pane-animation-close");
        } else {
            document.getElementById("nav-pane-animation-close").setAttribute("id", "nav-pane-animation-open");
        }
        sound_navpane.play();
    }

    /**
     *  Flashcards.getShapeDeckAnswers() will call getMessage to get the localized answers for this deck 
     */
    function getShapeDeckAnswers() {
        shapeAnswer[0] = getMessage("circle");
        shapeAnswer[1] = getMessage("square");
        shapeAnswer[2] = getMessage("triangle");
        shapeAnswer[3] = getMessage("oval");
        shapeAnswer[4] = getMessage("star");
        shapeAnswer[5] = getMessage("octagon");
        shapeAnswer[6] = getMessage("rectangle");
        shapeAnswer[7] = getMessage("trapezoid");
    }

    /**
     *  Flashcards.shapeDeckClicked() set the game to play through the this deck
     */
    function setShapeDeck() {
        deckAnswer = shapeAnswer;
        sound_begin.play();
        clear();
        lastCard = 8;
        cardSet = "FlashCardSet-Shapes";
        document.getElementById("card-title").innerHTML = getMessage("Shapes");
        document.getElementById("card-answer").style.color = "#499aff";
        document.getElementById("card").style.backgroundImage = "url('images/" + cardSet + '_' + cardCount + ".png')";
        document.getElementById("card-answer").innerHTML = shapeAnswer[cardCount];
        document.getElementById("card").innerHTML = "";
    }

    /* 
     * Flashcards.shapeDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
     */
    function shapeDeckClicked() {
        sound_buttonclick.play();
        navPaneClicked();
        setShapeDeck();
    }

    /**
     *  Flashcards.getCountingDeckAnswers() will call getMessage to get the localized answers for this deck 
     */
    function getCountingDeckAnswers() {
        numAnswer[0] = getMessage("one");
        numAnswer[1] = getMessage("two");
        numAnswer[2] = getMessage("three");
        numAnswer[3] = getMessage("four");
        numAnswer[4] = getMessage("five");
        numAnswer[5] = getMessage("six");
        numAnswer[6] = getMessage("seven");
        numAnswer[7] = getMessage("eight");
        numAnswer[8] = getMessage("nine");
        numAnswer[9] = getMessage("ten");
    }

    /**
     *  Flashcards.countingDeckClicked() set the game to play through the this deck 
     */
    function setCountingDeck() {
        sound_begin.play();
        deckAnswer = numAnswer;
        clear();
        lastCard = 10;
        cardSet = "FlashCardSet-Counting";
        document.getElementById("card-title").innerHTML = getMessage("Counting");
        document.getElementById("card-answer").style.color = "navy";
        document.getElementById("card").style.backgroundImage = "url('images/" + cardSet + '_' + cardCount + ".png')";
        document.getElementById("card-answer").innerHTML = numAnswer[cardCount];
        document.getElementById("card").innerHTML = "";
    }

    /**
     * Flashcards.countingDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck
     */
    function countingDeckClicked() {
        sound_buttonclick.play();
        navPaneClicked();
        setCountingDeck();
    }

    /**
     *  Flashcards.getSpanishDeckAnswers() will call getMessage to get the localized answers for this deck 
     */
    function getSpanishDeckAnswers() {
        spanishAnswer[0] = getMessage("sun");
        spanishAnswer[1] = getMessage("cloud");
        spanishAnswer[2] = getMessage("cat");
        spanishAnswer[3] = getMessage("dog");
        spanishAnswer[4] = getMessage("tree");
        spanishAnswer[5] = getMessage("fish");
        spanishAnswer[6] = getMessage("fruit");
        spanishAnswer[7] = getMessage("worm");
        spanishAnswer[8] = getMessage("bird");
        spanishAnswer[9] = getMessage("crocodile");
        spanishAnswer[10] = getMessage("book");
        spanishAnswer[11] = getMessage("socks");
        spanishAnswer[12] = getMessage("cup");
        spanishAnswer[13] = getMessage("chair");
    }

    /**
     * Flashcards.spanishDeckClicked() set the game to play through the this deck
     */
    function setSpanishDeck() {
        sound_begin.play();
        deckAnswer = spanishAnswer;
        clear();
        lastCard = 14;
        cardSet = "FlashCardSet-Spanish";
        document.getElementById("card-title").innerHTML = getMessage("Spanish");
        document.getElementById("card-answer").style.color = "#000000";
        document.getElementById("card").style.backgroundImage = "url('images/" + cardSet + '_' + cardCount + ".png')";
        document.getElementById("card-answer").innerHTML = spanishAnswer[cardCount];
        document.getElementById("card").innerHTML = "";
    }

    /**
     *  Flashcards.spanishDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
     */
    function spanishDeckClicked() {
        sound_buttonclick.play();
        navPaneClicked();
        setSpanishDeck();
    }

    /**
     *  Flashcards.getColorDeckAnswers() will call getMessage to get the localized answers for this deck 
     */
    function getColorDeckAnswers() {
        colorAnswer[0] = getMessage("red");
        colorAnswer[1] = getMessage("purple");
        colorAnswer[2] = getMessage("blue");
        colorAnswer[3] = getMessage("green");
        colorAnswer[4] = getMessage("orange");
        colorAnswer[5] = getMessage("yellow");
    }

    /**
     *  Flashcards.getColorDeckColors() will set the text colors for each card in this deck 
     */
    function getColorDeckColors() {
        colorHex[0] = "#dd0000";
        colorHex[1] = "#7e0b80";
        colorHex[2] = "#0000ff";
        colorHex[3] = "#33cc33";
        colorHex[4] = "#cc9933";
        colorHex[5] = "#fef600";
    }

    /** 
     * Flashcards.colorDeckClicked() set the game to play through the this deck
     */
    function setColorDeck() {
        sound_begin.play();
        deckAnswer = colorAnswer;
        clear();
        cardSet = "FlashCardSet-Color";
        lastCard = 6;

        document.getElementById("card-title").innerHTML = getMessage("Colors");
        document.getElementById("card").style.backgroundImage = "url('images/" + cardSet + '_' + cardCount + ".png')";
        document.getElementById("card-answer").innerHTML = colorAnswer[cardCount];
        document.getElementById("card-answer").style.color = colorHex[cardCount];
        document.getElementById("card").innerHTML =	"";
    }

    /**
     *  Flashcards.colorDeckClicked() plays the button click audio, navPane animation, and calls the setter for this deck 
     */
    function colorDeckClicked() {
        sound_buttonclick.play();
        navPaneClicked();
        setColorDeck();
    }

    /** 
     * Flashcards.initNav() gets the localized strings for the game play screen, sets the default deck to Shapes
     */
    function initNav() {
        document.getElementById("appName").innerHTML = getMessage("appName");
        document.getElementById("score-text").innerHTML = getMessage("score_text") + ": " + "0";
        document.getElementById("card-title").innerHTML = getMessage("Shapes");

        getColorDeckAnswers();
        getColorDeckColors();
        getShapeDeckAnswers();
        getCountingDeckAnswers();
        getSpanishDeckAnswers();

        sound_background.play();
        setShapeDeck();
    }

    /**
     *  Flashcards.playNowClicked() will initialize the game screen when Play Now button is clicked and hide the splash screen 
     */
    function playNowClicked() {
        initNav();
        document.getElementById("screen").style.display = "none";
        document.getElementById("screen-nav").style.display = "inline";
    }

    /**
     * Flashcards.isLastCard() 
     * @return true if card count is equal to the number of cards in the deck, else return false
     */
    function isLastCard() {
        if (lastCard === cardCount) {
            return true;
        }
        return false;
    }

     /**
     * Flashcards.endGame() opens nav pane, plays audio sound for end of game, shows correct star score and replay button
     */
    function endGame() {
        var star,
            count,
            container;
        document.getElementById("nav-pane-animation-close").setAttribute("id", "nav-pane-animation-open");
        sound_navpane.play();

        sound_end.play();
        endGameFlag = true;
        document.getElementById("card-flip").setAttribute("id", "current-card");
        document.getElementById("card").style.backgroundImage = "url('images/FC_BlankCard_021512_a.png')";

        //paint correct stars equal to rightCount
        for (count = 1; count <= rightCount; count = count + 1) {
            star = document.createElement("img");
            star.setAttribute('src', 'images/FC_Star_120911_a.png');
            star.setAttribute('id', ('star' + count));
            star.setAttribute('class', ('star'));
            container = document.getElementById("screen-nav");
            container.appendChild(star);
        }

        //paint remaining stars as empty stars
        for (count = (rightCount + 1); count <= lastCard; count = count + 1) {
            star = document.createElement("img");
            star.setAttribute('src', 'images/FC_Star_120911_b.png');
            star.setAttribute('id', ('star' + count));
            star.setAttribute('class', ('star'));
            container = document.getElementById("screen-nav");
            container.appendChild(star);
        }

        //if user got more right than wrong then show localized strings for "good job" else show localized strings for "try again" 
        if (wrongCount < rightCount) {
            document.getElementById("card-answer").innerHTML = getMessage("goodjob");
        } else {
            document.getElementById("card-answer").innerHTML = getMessage("tryagain");
        }
        //set card answer color and display replay button
        document.getElementById("card-answer").style.color = "#499aff";
        document.getElementById("card-answer").style.opacity = "1";
        document.getElementById("replay-button").style.display = "inline";
    }

    /**
     * Flashcards.flipCard() hide answers and moves to next card in the deck, increments counters and checks for end game state
     */
    function flipCard() {
        hideAnswer();
        document.getElementById("current-card").setAttribute("id", "card-flip");
        cardCount = cardCount + 1;
        if (!isLastCard()) {
            sound_cardflip.play();
            document.getElementById("card").style.backgroundImage = "url('images/" + cardSet + '_' + cardCount + ".png')";
            document.getElementById("card-answer").innerHTML = deckAnswer[cardCount];
            if (cardSet === "FlashCardSet-Color") {
                document.getElementById("card-answer").style.color = deckAnswer[cardCount];
            }
            document.getElementById("card-flip").setAttribute("id", "current-card");
        } else {
            endGame();
        }
    }

    /**
     * Flashcards.wrongButtonClicked() plays audio sounds, increments wrongCount and calls flipCard()
     */
    function wrongButtonClicked() {
        sound_thumbbutton.play();
        sound_buttonclick.play();
        wrongCount = wrongCount + 1;
        flipCard();
    }

    /**
     * Flashcards.rightButtonClicked() plays audio sounds, increments rightCount and calls flipCard()
     */
    function rightButtonClicked() {
        sound_starbutton.play();
        sound_buttonclick.play();
        rightCount = rightCount + 1;
        flipCard();
        document.getElementById("score-text").innerHTML = getMessage("score_text") + ": " + rightCount;
    }

    /**
     * Flashcards.replayButtonClicked() restarts current game and calls clear()
     */
    function replayButtonClicked() {
        if (cardSet === "FlashCardSet-Color") {
            colorDeckClicked();
        } else if (cardSet === "FlashCardSet-Shapes") {
            shapeDeckClicked();
        } else if (cardSet === "FlashCardSet-Spanish") {
            spanishDeckClicked();
        } else if (cardSet === "FlashCardSet-Counting") {
            countingDeckClicked();
        }
        clear();
    }

    /**
     * Flashcards.showAnswer() will show right and wrong buttons, answer and set cursor type
     */
    function showAnswer() {
        document.getElementById("wrong-button").style.display = "inline";
        document.getElementById("right-button").style.display = "inline";
        document.getElementById("card-answer").style.opacity = "1";
        document.getElementById("card").style.cursor = "default";
        document.getElementById("card-answer").style.cursor = "default";
    }

    /**
     * Flashcards.cardClicked() plays button click sound, makes sure the nav pane is closed, and if not end game state will call showAnswer()
     */
    function cardClicked() {
        sound_buttonclick.play();
        if (document.getElementById("nav-pane-animation-open")) {
            sound_navpane.play();
            document.getElementById("nav-pane-animation-open").setAttribute("id", "nav-pane-animation-close");
        }

        if (!endGameFlag) {
            showAnswer();
        }
    }

    function setEventListeners() {
        document.getElementById("playButton").addEventListener('click', function () {
            playNowClicked();
        });
        document.getElementById("nav-pane").addEventListener('click', function () {
            navPaneClicked();
        });
        document.getElementById("shapes_deck").addEventListener('click', function () {
            shapeDeckClicked();
        });
        document.getElementById("color_deck").addEventListener('click', function () {
            colorDeckClicked();
        });
        document.getElementById("counting_deck").addEventListener('click', function () {
            countingDeckClicked();
        });
        document.getElementById("spanish_deck").addEventListener('click', function () {
            spanishDeckClicked();
        });
        document.getElementById("card").addEventListener('click', function () {
            cardClicked();
        });
        document.getElementById("card-answer").addEventListener('click', function () {
            cardClicked();
        });
        document.getElementById("wrong-button").addEventListener('click', function () {
            wrongButtonClicked();
        });
        document.getElementById("right-button").addEventListener('click', function () {
            rightButtonClicked();
        });
        document.getElementById("replay-button").addEventListener('click', function () {
            replayButtonClicked();
        });
        document.getElementById("help_icon").addEventListener('click', function () {
            helpClicked();
        });
        document.getElementById("help_close").addEventListener('click', function () {
            helpCloseClicked();
        });
    }

    /**
    * Flashcards.init() will set the license, play intro sound, and set splash screen text 
    */
    function init() {
        license_init("license", "screen");
        sound_intro.play();
        document.getElementById("appName").innerHTML = getMessage("appName");
        document.getElementById("adventure-text").innerHTML = getMessage("adventure_text");
        document.getElementById("cards-text").innerHTML = getMessage("cards_text");
        document.getElementById("play_button-text").innerHTML = getMessage("play_button_text");
        document.getElementById("screen-nav").style.display = "none";
        setEventListeners();
    }

    init();
};

window.addEventListener('load', function () {
    "use strict";
    var myApp = new FlashCardApp();
    //hack to get active state to work on lunchbox/tizen emulator
    window.touchstart = function (e) {};
});