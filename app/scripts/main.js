
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';
    document.getElementById('GameOverSound').volume = 0.2;
    document.getElementById('background-music').volume = 0.5;

    var game = new window.Game($('.GameCanvas'));
    game.start();
});
