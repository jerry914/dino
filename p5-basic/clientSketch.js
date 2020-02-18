
var socket = io.connect('http://IP:8081', { port: 8081, rememberTransport: false });

function setup() {
	createCanvas(windowWidth,windowHeight);
	setupOsc(3334, 12000);
	sendOsc('/test',1);
}

function draw() {
	background(220,150,100);
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);

}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: 'IP'},
			client: { port: oscPortOut, host: 'IP'}
		});
	});
	socket.on('message', function(msg) {
		if (msg[0] == '#bundle') {
			for (var i=2; i<msg.length; i++) {
				receiveOsc(msg[i][0], msg[i].splice(1));
			}
		} else {
			receiveOsc(msg[0], msg.splice(1));
		}
	});
}

function windowResized(){
	resizeCanvas(windowWidth,windowHeight);
}