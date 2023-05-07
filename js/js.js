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
    if (velocity != 0) {
        let color = (1 - (velocity / 127)) * 255
        keyUI.style.backgroundColor = `rgb(255,${color},${color})`

    }
    else {
        if (keyUI.className == "black-key")
            keyUI.style.backgroundColor = 'black'
        else
            keyUI.style.backgroundColor = 'white'

    }
}