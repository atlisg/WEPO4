var muted = false;
function toggleMute() {
	if(!this.muted) {
		this.muted = true;
		$('.Mute').show();
		$('.UnMute').hide();
		var sounds = document.getElementsByClassName('sound');
		for (var i = 0; i < sounds.length; i++) {
			sounds[i].pause();
			sounds[i].currentTime = 0;
		}
	} else {
		this.muted = false;
		$('.Mute').hide();
		$('.UnMute').show();
		document.getElementById('background-music').play();
	}
};