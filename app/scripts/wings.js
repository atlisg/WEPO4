
window.Wings = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 250; // * 10 pixels per second

	var Wings = function(el1, el2, game) {
		this.left = el1;
		this.right = el2;
		this.game = game;
		this.degreesL = 315;
		this.degreesR = 45;
		this.forward = true;
	};
	/**
	 * Resets the state of the player for a new game.
	 */
	Wings.prototype.reset = function() {
		this.degreesL = 315;
		this.degreesR = 45;
	};

	Wings.prototype.onFrame = function(delta) {
		if (this.forward) {
			this.degreesL -= delta * SPEED;
			this.degreesR += delta * SPEED;
		} else {
			this.degreesL += delta * SPEED;
			this.degreesR -= delta * SPEED;
		}

		if (this.degreesL <= 240) {
			this.forward = false;
		}
		if (this.degreesL >= 315) {
			this.forward = true;
		}

		// Update UI
		this.left.css('transform', 'translateZ(0) rotateY(' + this.degreesL + 'deg)');
		this.right.css('transform', 'translateZ(0) rotateY(' + this.degreesR + 'deg)');
	};

	return Wings;

})();
