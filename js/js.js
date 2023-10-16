import { Synth } from "./synth.js";

listenKeyboardClick();
listenMidiDevicePlay();
let sound = new Synth();

function listenMidiDevicePlay() {
    navigator.requestMIDIAccess().then(function (midiAccess) {
        var inputs = midiAccess.inputs.values();
        for (
            var input = inputs.next();
            input && !input.done;
            input = inputs.next()
        ) {
            input.value.onmidimessage = function (event) {
                if (event.data[0] === 144) {
                    // Note on message
                    var note = event.data[1];
                    var velocity = event.data[2];
                    pressTheKey(note, velocity);
                } else if (event.data[0] === 128) {
                    // Note off message
                    var note = event.data[1];
                    var velocity = event.data[2];
                }
            };
        }
    });
}

function pressTheKey(keyNumber, velocity) {
    let keyUI = document.getElementById(keyNumber);
    if (velocity != 0) {
        let color = (1 - velocity / 127) * 255;
        keyUI.style.backgroundColor = `rgb(255,${color},${color})`;
        sound.playNote(keyNumber);
    } else {
        if (keyUI.className == "black-key") keyUI.style.backgroundColor = "black";
        else keyUI.style.backgroundColor = "white";
        sound.stopNote(keyNumber);
    }
}

function cleanAllKeys() {
    let keys = document.querySelectorAll(".keys > div");
    keys.forEach(key => {
        if (key.className == "black-key") key.style.backgroundColor = "black";
        else key.style.backgroundColor = "white";
    })
}

function listenKeyboardClick() {
    document.querySelector(".keys").addEventListener("mousedown" || "touchstart", function (e) {
        if (e.target.id) {
            let note = e.target.id;
            pressTheKey(note, 50);
        }
    });
    document.querySelector(".keys").addEventListener("mouseup" || "touchend", function (e) {
        sound.stopAllNotes();
        cleanAllKeys();
        if (e.target.id) {
            let note = e.target.id;
            pressTheKey(note, 0);
        }
    });
}
