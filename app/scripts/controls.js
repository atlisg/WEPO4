
window.Controls = (function() {
	'use strict';

	/**
	 * Key codes we're interested in.
	 */
	var KEYS = {
		0: 'mouse',
		32: 'space',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	/**
	 * A singleton class which abstracts all player input,
	 * should hide complexity of dealing with keyboard, mouse
	 * and touch devices.
	 * @constructor
	 */
	var Controls = function() {
		this._didJump = false;
		this.keys = {};
		$(window)
			.on('keydown', this._onKeyDown.bind(this))
			.on('keyup', this._onKeyUp.bind(this));
		$('.GameCanvas')
			.on('mousedown', this._onMouseClick.bind(this));
	};

	Controls.prototype._onKeyDown = function(e) {
		// Only jump if space was pressed.

		if ((e.keyCode === 32 && !this.keys[KEYS[e.keyCode]])) {
			this._didJump = true;
		}

		var keyName;
		if(e.keyCode !== undefined) {
			// Remember that this button is down.
			if (e.keyCode in KEYS) {
				keyName = KEYS[e.keyCode];
				this.keys[keyName] = true;
				return false;
			}
		} else {
			return false;
		}


	};
	Controls.prototype._onMouseClick = function(e) {
		if (e.button === 0) {
			this._didJump = true;
		}
	};

	Controls.prototype._onKeyUp = function(e) {
		var keyName;
		if(e.keyCode !== undefined) {
			// Remember that this button is no longer down.

			if (e.keyCode in KEYS) {
				keyName = KEYS[e.keyCode];
				this.keys[keyName] = false;
				return false;
			}
		} else {
			return false;
		}
	};

	/**
	 * Only answers true once until a key is pressed again.
	 */
	Controls.prototype.didJump = function() {
		var answer = this._didJump;
		this._didJump = false;
		if (answer) {console.log('Answering:' + answer);}
		return answer;
	};

	// Export singleton.
	return new Controls();
})();
