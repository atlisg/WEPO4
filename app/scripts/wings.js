
window.Wings = (function() {
	'use strict';

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 5; // * 10 pixels per second

	var Clouds = function(el1, el2, game) {
		this.left = el1;
		this.right = el2;
		this.game = game;
		this.degreesL = 0;
		this.degreesR = 180;
	};
	/**
	 * Resets the state of the player for a new game.
	 */
	Clouds.prototype.reset = function() {
		this.degreesL = 0;
		this.degreesR = 180;
	};

	Clouds.prototype.onFrame = function(delta) {

		this.degreesL += delta * SPEED;
		this.degreesR -= delta * SPEED;

		if (this.degreesL >= 90) {
			this.reset();
		}

		// Update UI
		this.left.css('transform', 'translateZ(0) rotateY(' + this.degreesL + 'deg, ');
		this.right.css('transform', 'translateZ(0) rotateY(' + this.degreesR + 'deg, ');
	};

	return Clouds;

})();
