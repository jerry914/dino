
function playBox(time, playbackRate) {
    box.rate(playbackRate);
    box.play(time);
}

function playDrum(time, playbackRate) {
    drum.rate(playbackRate);
    drum.play(time);
}

function playJump(time, playbackRate) {
    jump.rate(playbackRate);
    jump.play(time);
}

function playAch(time, playbackRate) {
    ach.rate(playbackRate);
    ach.play(time);
}

function playDie(time, playbackRate) {
    die.rate(playbackRate);
    die.play(time);
}

function playNote(key){
	dino.jump(key);
	myPart.start();
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


let boxPhrase = new p5.Phrase('box', playBox, boxPat);
let drumPhrase = new p5.Phrase('drum', playDrum, drumPat);
let jumpPhrase = new p5.Phrase('jump', playJump, jumpPat);
let achPhrase = new p5.Phrase('ach', playAch,achPat);
let diePhrase = new p5.Phrase('die', playDie,diePat);

function playPhrase(phrase){
    myPart.start();
    switch (phrase){
        case 1:
            myPart.addPhrase(boxPhrase);
            break;
        case 2:
            myPart.addPhrase(drumPhrase);
            break;
        case 3:
            myPart.addPhrase(jumpPhrase);
            break;
        case 4:
            myPart.addPhrase(achPhrase);
            break;
        case　5:
            myPart.addPhrase(diePhrase);
            break;
        default:
            break;
    }
}

function stopPhrase(phrase){
    switch (phrase){
        case 1:
            myRemovePhrase('box');
            break;
        case 2:
            myRemovePhrase('drum');
            break;
        case 3:
            myRemovePhrase('jump');
            break;
        case 4:
            myRemovePhrase('ach');
            break;
        case　5:
            myRemovePhrase('die');
            break;
        default:
            break;
    }
}

function myRemovePhrase (name) {  
    for (var i in myPart.phrases) { 
        if (myPart.phrases[i].name === name) { 
            myPart.phrases.splice(i, 1); 
        } 
    } 
}; 