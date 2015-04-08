
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';
    document.getElementById('TaDaSound').volume = 0.35;
    document.getElementById('GameOverSound').volume = 0.2;
    document.getElementById('StackSong').volume = 0.5;

    var game = new window.Game($('.GameCanvas'));
    game.start();
});
