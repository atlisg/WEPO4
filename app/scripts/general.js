var Game = window.Game;
function toggleMute() {
	if(!Game.muted) {
		muted = true;
		$('.Mute').show();
		$('.UnMute').hide();
	} else {
		muted = false;
		$('.Mute').hide();
		$('.UnMute').show();
	}
}