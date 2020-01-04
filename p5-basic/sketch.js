var x, y;
var wave;
var wave2;
var button;
var playing = false;
let uImg;
let uImg2;
let dinoJump;
let aniCount=0 ;

let dino;

function preload() {
	uImg=loadImage('https://jerry914.github.io/pplant/assect/dino left ft.png');
	uImg2=loadImage('https://jerry914.github.io/pplant/assect/dino right ft.png');
	dinoJump=loadImage('https://jerry914.github.io/pplant/assect/Dino.png');
}


function setup() {
	createCanvas(500, 500);
	setupOsc(12000, 3334);
	dino = new Dino();
	wave = new p5.Oscillator();
	wave.setType('square');
	wave2 = new p5.Oscillator();
	wave2.setType('square');
	button = createButton('play/pause');
	button.mousePressed(toggle);
}

function draw() {
	background(0, 0, 255);
	fill(0, 255, 0);
	ellipse(x, y, 100, 100);
	fill(0);
	text("I'm p5.js", x-25, y);
	dino.show();
	dino.move();
	// aniCount++;
	
}


function playNote(key){
	dino.jump();
	console.log(key);
	// key = key+;
	var freqence = 440*pow(2,(key)/12);
	console.log(freqence);
	wave.freq(freqence);
	wave.amp(0.2,0.1);
	freqence = 440*pow(2,(key-3)/12);
	console.log(freqence);
	wave2.freq(freqence);
	wave2.amp(0.1,0.1);
}

function stopNote(){
	wave.amp(0,0.2);
	wave2.amp(0,0.2);
}

function toggle() {
	if (!playing) {
		wave.start();
		wave.amp(0);
		wave2.start();
		wave2.amp(0);
		playing = true;
	} else {
		wave.amp(0, 1);
		playing = false;
	}
}
function getBaseLog(x, y) {
	return Math.log(y) / Math.log(x);
}

function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);
	
	if (address == '/test') {
		x = value[0];
		y = value[1];
	}
	else{
		var storeAdd = address.split('/');
		if (storeAdd[2].search('push')>=0){
			if(value == 0){
				stopNote();
			}
			else if(value == 1){
				if(storeAdd[1]==1){
					playNote(storeAdd[2].replace('push',''));
				}
				else{
					playNote(int(storeAdd[2].replace('push',''))-12);
				}
				
			}
		}
	}
	
}

function sendOsc(address, value) {
	socket.emit('message', [address].concat(value));
}

function setupOsc(oscPortIn, oscPortOut) {
	var socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {	
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
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
