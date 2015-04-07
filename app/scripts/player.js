
window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 80; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var GRAVITY = 0.5;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.isJumping = false;
		this.JUMP_SPEED = 88;
		this.WIDTH  = document.getElementsByClassName('Player').offsetWidth;
		this.HEIGHT = document.getElementsByClassName('Player').offsetHeight;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		SPEED = 80;
		this.isJumping = false;
	};

	Player.prototype.onFrame = function(delta) {

		this.pos.y += GRAVITY;
		var jumped = Controls.didJump();
		if (jumped && !this.isJumping) {
			this.isJumping = true;
		} else if (jumped && this.isJumping) {
			SPEED = this.JUMP_SPEED-10;
			return;
		}

		if (this.isJumping) {
			this.pos.y -= delta * SPEED;
			if ((SPEED -= 2) < 2) {
				this.isJumping = false;
				SPEED = this.JUMP_SPEED;
			}
		}
		// if (Controls.keys.space) {
		// 	SPEED = 60;
		// }

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT-(10.4/2)) {
			return this.game.gameover();
		}
	};

	return Player;

})();
