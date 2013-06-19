
main = function() {
	// Tu codigo
	// recuerda el ejercicio anterior para el ajax, pero añade la responseType como "arraybuffer"
	// 3. un booleano para describir la llamada como sincrona o asincrona
	var soundRequest = new XMLHttpRequest();
	soundRequest.open("GET","http://23.23.14.11/DST-AngryRobotIII.mp3", true);
	
	soundRequest.responseType = "arraybuffer";
	// final de tu codigo
	soundRequest.onload = function () {
		try {
			var context = new webkitAudioContext();

			var mainNode = context.createGainNode(0);
			mainNode.connect(context.destination);

			var clip = context.createBufferSource();

			context.decodeAudioData(soundRequest.response, function (buffer) {
				clip.buffer = buffer;
				clip.gain.value = 1.0;
				clip.connect(mainNode);
				clip.loop = true;
				clip.noteOn(0);
			}, function (data) {});
		}
		catch(e) {
			console.warn('Web Audio API is not supported in this browser');
		}
	};
	soundRequest.send();
};

window.onload = main;