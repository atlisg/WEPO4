window.Game = (function() {
	'use strict';
	var Controls = window.Controls;
	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.pipeWidth = 6;
		this.pipeDist  = (this.WORLD_WIDTH/4)+(6/4);
		this.el = el;
		this.player   = new window.Player(this.el.find('.Player'), this);
		this.pipes = [];
		this.floor = new window.Floor(this.el.find('#Floor'),0,this.WORLD_HEIGHT-(10.4/2) , 10.4, 3.95, this);
		this.clouds = new window.Clouds(this.el.find('.Clouds'), 0, 5, 14, this);
		this.wings = new window.Wings(this.el.find('#Player-wings-left'), this.el.find('#Player-wings-right'), this);
		this.pipes.push(new window.Pipe(this.el.find('.Pipe4Lower'), this.WORLD_WIDTH+this.pipeDist*3, 35, 30, this.pipeWidth, this, false));
		this.pipes.push(new window.Pipe(this.el.find('.Pipe4Upper'), this.WORLD_WIDTH+this.pipeDist*3,  0, 15, this.pipeWidth, this, true ));
		this.pipes.push(new window.Pipe(this.el.find('.Pipe3Lower'), this.WORLD_WIDTH+this.pipeDist*2, 30, 30, this.pipeWidth, this, false));
		this.pipes.push(new window.Pipe(this.el.find('.Pipe3Upper'), this.WORLD_WIDTH+this.pipeDist*2,  0, 10, this.pipeWidth, this, true ));
		this.pipes.push(new window.Pipe(this.el.find('.Pipe2Lower'), this.WORLD_WIDTH+this.pipeDist*1, 40, 30, this.pipeWidth, this, false));
		this.pipes.push(new window.Pipe(this.el.find('.Pipe2Upper'), this.WORLD_WIDTH+this.pipeDist*1,  0, 20, this.pipeWidth, this, true ));
		this.pipes.push(new window.Pipe(this.el.find('.Pipe1Lower'), this.WORLD_WIDTH+this.pipeDist*0, 30, 30, this.pipeWidth, this, false));
		this.pipes.push(new window.Pipe(this.el.find('.Pipe1Upper'), this.WORLD_WIDTH+this.pipeDist*0,  0, 10, this.pipeWidth, this, true ));
		this.isPlaying  = false;
		this.hasStarted = false;

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

		// Go through all of the pipes and check for collision
		// and check if a pipe has gone off screen.
		for (var i = 0; i < this.pipes.length; i++) {
			this.pipes[i].onFrame(delta);
			if (this.pipes[i].checkCollisionWithPlayer(this.player.pos)) {
				this.gameover();
			} else {
				this.pipes[i].countScore();
			}
		}
		this.floor.onFrame(delta);
		this.clouds.onFrame(delta);
		this.wings.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
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
		for (var i = 0; i < this.pipes.length; i++) {
			this.pipes[i].reset();
		}
		document.getElementById('Score').textContent = 0;
	};
	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;
		this.hasStarted = false;
		if (!muted) {
			document.getElementById('GameOverSound').play();
		}
		if (document.getElementById('HiScore').textContent <
			document.getElementById('Score').textContent) {
			document.getElementById('HiScore').textContent =
			document.getElementById('Score').textContent;
		}
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					Controls._didJump = false;
					that.start();
				});
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
	Game.prototype.FLOOR_WIDTH = 7.9;
	Game.prototype.FLOOR_HEIGHT = 1.5;
	return Game;
})();