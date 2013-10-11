require(['scaleBody', 'flashcards', 'domReady!'], function (scaleBody, FlashCards) {
    var App = new FlashCards();
    App.init();

    //hack to get active state to work on webkit
    this.touchstart = function (e) {};

    scaleBody(document.getElementById('container'), 720);
});
