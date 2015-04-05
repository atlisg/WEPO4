
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe1upper = new window.Pipe(this.el.find('.Pipe1Upper'), 90, 0, 10, 6, this);
		this.pipe1lower = new window.Pipe(this.el.find('.Pipe1Lower'), 90, 30, 30, 6, this);
		this.pipe2upper = new window.Pipe(this.el.find('.Pipe2Upper'), 130, 0, 20, 6, this);
		this.pipe2lower = new window.Pipe(this.el.find('.Pipe2Lower'), 130, 40, 30, 6, this);
		this.pipe3upper = new window.Pipe(this.el.find('.Pipe3Upper'), 150, 0, 30, 6, this);
		this.pipe3lower = new window.Pipe(this.el.find('.Pipe3Lower'), 150, 50, 30, 6, this);
		this.pipe4upper = new window.Pipe(this.el.find('.Pipe4Upper'), 180, 0, 15, 6, this);
		this.pipe4lower = new window.Pipe(this.el.find('.Pipe4Lower'), 180, 35, 30, 6, this);
		this.isPlaying = false;

		var fontSize = Math.min(
			window.innerWidth / 102.4,
			window.innerHeight / 57.6
			);
		el.css('fontSize', fontSize + 'px');

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1upper.onFrame(delta);
		this.pipe1lower.onFrame(delta);
		this.pipe2upper.onFrame(delta);
		this.pipe2lower.onFrame(delta);
		this.pipe3upper.onFrame(delta);
		this.pipe3lower.onFrame(delta);
		this.pipe4upper.onFrame(delta);
		this.pipe4lower.onFrame(delta);

		this.checkCollisionWithPipes();

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	Game.prototype.checkCollisionWithPipes = function() {
		var playerX = this.player.pos.x,
			playerY = this.player.pos.y,
			upipe1X = this.pipe1upper.pos.x,
			upipe1Y = this.pipe1upper.pos.y,
			lpipe1X = this.pipe1lower.pos.x,
			lpipe1Y = this.pipe1lower.pos.y,
			height1 = this.pipe1upper.height,
			upipe2X = this.pipe2upper.pos.x,
			upipe2Y = this.pipe2upper.pos.y,
			lpipe2X = this.pipe2lower.pos.x,
			lpipe2Y = this.pipe2lower.pos.y,
			height2 = this.pipe2upper.height,
			upipe3X = this.pipe3upper.pos.x,
			upipe3Y = this.pipe3upper.pos.y,
			lpipe3X = this.pipe3lower.pos.x,
			lpipe3Y = this.pipe3lower.pos.y,
			height3 = this.pipe3upper.height,
			upipe4X = this.pipe4upper.pos.x,
			upipe4Y = this.pipe4upper.pos.y,
			lpipe4X = this.pipe4lower.pos.x,
			lpipe4Y = this.pipe4lower.pos.y,
			height4 = this.pipe4upper.height,
			width   = this.pipe1upper.width;
		//console.log('playerY: ' + playerY + ' lpipe1Y: ' + lpipe1Y + ' upipe1Y: ' + upipe1Y + ' height: ' + height);
		if ((Math.abs(lpipe1X - playerX) < width / 2 && playerY + 5 > lpipe1Y) ||
			(Math.abs(upipe1X - playerX) < width / 2 && playerY < upipe1Y + height1) ||
			(Math.abs(lpipe2X - playerX) < width / 2 && playerY + 5 > lpipe2Y) ||
			(Math.abs(upipe2X - playerX) < width / 2 && playerY < upipe2Y + height2) ||
			(Math.abs(lpipe3X - playerX) < width / 2 && playerY + 5 > lpipe3Y) ||
			(Math.abs(upipe3X - playerX) < width / 2 && playerY < upipe3Y + height3) ||
			(Math.abs(lpipe4X - playerX) < width / 2 && playerY + 5 > lpipe4Y) ||
			(Math.abs(upipe4X - playerX) < width / 2 && playerY < upipe4Y + height4)) {
			this.gameover();
		}
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe1upper.reset();
		this.pipe1lower.reset();
		this.pipe2upper.reset();
		this.pipe2lower.reset();
		this.pipe3upper.reset();
		this.pipe3lower.reset();
		this.pipe4upper.reset();
		this.pipe4lower.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


