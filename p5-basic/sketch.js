var x, y;
var wave;
var wave2;
var button;
var playing = false;

let box, drum, myPart;
let jump,ach,die;
let boxPat = [1,0,0,2,0,2,0,0,2,2,3,0];
let drumPat = [0,1,1,0,2,0,1,0,5,5,1,0];
let jumpPat = [1,2,3,4,5,6,7,8,9,0,0,0];
let achPat = [1,0,0,2,0,2,0,0,0,0,0,0];
let diePat = [1,0,0,2,0,2,0,0,0,0,1,1];

let noise;
let noiseLooper;

let uImg;
let uImg2;
let dinoJump;
let aniCount=0 ;

let ground = [];
let bImg;


let dino;

function preload() {
	uImg=loadImage('https://jerry914.github.io/pplant/assect/dino left ft.png');
	uImg2=loadImage('https://jerry914.github.io/pplant/assect/dino right ft.png');
	dinoJump=loadImage('https://jerry914.github.io/pplant/assect/Dino.png');

	bImg = loadImage('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/ground.png');

	box = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/hanning.wav');
	drum = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/kick.wav');
	jump = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/jump.mp3');
	ach = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/achieve.wav');
	die = loadSound('https://raw.githubusercontent.com/jerry914/dino/master/p5-basic/assets/demise.wav');
}


function setup() {
	createCanvas(windowWidth,windowHeight);
	setupOsc(12000, 3334);
	dino = new Dino();

	
}

function draw() {
	background(250, 250, 250);
	fill(0, 255, 0);
	ellipse(x, y, 100, 100);
	fill(0);
	text("I'm p5.js", x-25, y);
	dino.show();
	dino.move();
	// aniCount++;
	
}


function toggle() {
	if (!playing) {
		wave = new p5.Oscillator();
		wave.setType('square');
		wave2 = new p5.Oscillator();
		wave2.setType('square');
		wave.start();
		wave.amp(0);
		wave2.start();
		wave2.amp(0);

		
		myPart = new p5.Part();
		myPart.setBPM(60);
		myPart.loop();
		masterVolume(0.3);

		// noise = new p5.Noise('pink');
		// noiseLooper = new p5.SoundLoop(function(timeFromNow){
		// 	noise.start();
		// 	noise.amp(0.3);
		// 	noise.amp(0,0.2);
		// 	background(255 * (noiseLooper.iterations % 2));
		// }, 2);
		// noiseLooper.start();

		playing = true;
	} else {
		wave.amp(0, 1);
		playing = false;
	}
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
					playNote(int(storeAdd[2].replace('push',''))+int(12));
				}
				else{
					playNote(int(storeAdd[2].replace('push','')));
				}
				
			}
		}
		else if (storeAdd[2].search('toggle')>=0){
			if(value == 0){
				stopPhrase(int(storeAdd[2].replace('toggle','')));
			}
			else{
				playPhrase(int(storeAdd[2].replace('toggle','')));
			}
		}
		else if (storeAdd[2].search('multitoggle')>=0){
			
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
