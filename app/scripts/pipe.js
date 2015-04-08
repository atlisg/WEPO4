
window.Pipe = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 10; // * 10 pixels per second

	// IMPORTED CONSTANT
	var PLAYER_POSITION_X = 30;

	var Pipe = function(el, initX, initY, height, width, game, upper) {
		this.el = el;
		this.game = game;
		this.pos = { x: initX, y: initY };
		this.initPos = { x: initX, y: initY };
		this.height = height;
		this.width = width;
		this.isUpper = upper;
		this.hasCounted = false;
	};
	/**
	 * Resets the state of the player for a new game.
	 */
	Pipe.prototype.reset = function() {
		this.pos.x = this.initPos.x;
		this.pos.y = this.initPos.y;
		this.hasCounted = false;
	};

	Pipe.prototype.onFrame = function(delta) {
		if (this.pos.x < -6) {
			this.pos.x = this.game.WORLD_WIDTH;
			this.hasCounted = false;
		}

		if (this.game.hasStarted) {
			this.pos.x -= delta * SPEED;
		}


		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.countScore = function() {
		if(this.isUpper) {
			if ((this.pos.x < PLAYER_POSITION_X) && !this.hasCounted) {
				document.getElementById('Score').textContent++;
				this.hasCounted = true;
				//document.getElementById('TaDaSound').play();
			}
		}
	};
	Pipe.prototype.checkCollisionWithPlayer = function(playerPos) {
		if (this.isUpper){
			return (Math.abs(this.pos.x - playerPos.x) < (this.width / 2) && (playerPos.y < this.pos.y + this.height));
		} else {
			return (Math.abs(this.pos.x - playerPos.x) < (this.width / 2) && (playerPos.y + 5 > this.pos.y));
		}
	};

	return Pipe;

})();
