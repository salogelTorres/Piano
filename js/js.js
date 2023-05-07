navigator.requestMIDIAccess().then(function (midiAccess) {
    var inputs = midiAccess.inputs.values();
    console.log(inputs)
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        input.value.onmidimessage = function (event) {
            if (event.data[0] === 144) { // Note on message
                var note = event.data[1];
                var velocity = event.data[2];
                if (velocity != 0) {
                    let color = (1 - (velocity / 127)) * 255
                    console.log(color)
                    document.getElementById(note).style.backgroundColor = `rgb(255,${color},${color})`

                }
                else {
                    if (document.getElementById(note).className == "black-key")
                        document.getElementById(note).style.backgroundColor = 'black'
                    else
                        document.getElementById(note).style.backgroundColor = 'white'

                }

                console.log("Note " + note + " on, velocity " + velocity);
            } else if (event.data[0] === 128) { // Note off message
                var note = event.data[1];
                var velocity = event.data[2];
                console.log("Note " + note + " off, velocity " + velocity);
            }
        }
    }
});