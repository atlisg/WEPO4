var muted = false;

function toggleMute() {
	'use strict';
	if(!muted) {
		muted = true;
		$('.Mute').show();
		$('.UnMute').hide();
		var sounds = document.getElementsByClassName('sound');
		for (var i = 0; i < sounds.length; i++) {
			sounds[i].pause();
			sounds[i].currentTime = 0;
		}
	} else {
		muted = false;
		$('.Mute').hide();
		$('.UnMute').show();
		document.getElementById('background-music').play();
	}
}