var context = new AudioContext(),
    oscillators = {};



navigator.requestMIDIAccess().then(function (midiAccess) {
    var inputs = midiAccess.inputs.values();
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = function (event) {
            if (event.data[0] === 144) { // Note on message
                var note = event.data[1];
                var velocity = event.data[2];
                pressTheKey(note, velocity)

            } else if (event.data[0] === 128) { // Note off message
                var note = event.data[1];
                var velocity = event.data[2];
                console.log("Note " + note + " off, velocity " + velocity);
            }
        }
    }
});


function pressTheKey(keyNumber, velocity) {
    let keyUI = document.getElementById(keyNumber);
    let frequency = midiNoteToFrequency(keyNumber);
    if (velocity != 0) {
        let color = (1 - (velocity / 127)) * 255
        keyUI.style.backgroundColor = `rgb(255,${color},${color})`
        playNote(frequency);
    }
    else {
        if (keyUI.className == "black-key")
            keyUI.style.backgroundColor = 'black'
        else
            keyUI.style.backgroundColor = 'white'
        stopNote(frequency);
    }
}



function midiNoteToFrequency(note) {
    return Math.pow(2, ((note - 69) / 12)) * 440
}


function playNote(frequency) {
    oscillators[frequency] = context.createOscillator();
    oscillators[frequency].frequency.value = frequency;
    oscillators[frequency].connect(context.destination);
    oscillators[frequency].start(context.currentTime);
}


function stopNote(frequency) {
    oscillators[frequency].stop(context.currentTime);
    oscillators[frequency].disconnect();
}
