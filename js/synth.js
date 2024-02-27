export class Synth {
  #context = null;
  #oscillators = []
  #gain = null;

  constructor() {
    (this.#context = new AudioContext()), (this.#oscillators = {});
    this.#gain = this.#context.createGain();
    this.#gain.gain.value = 0.1;
  }

  #midiNoteToFrequency(note) {
    return Math.pow(2, (note - 69) / 12) * 440;
  }

  playNote(note) {
    let frequency = this.#midiNoteToFrequency(note);
    this.#oscillators[frequency] = this.#context.createOscillator();
    this.#oscillators[frequency].frequency.value = frequency;
    this.#gain.connect(this.#context.destination)
    this.#oscillators[frequency].connect(this.#gain);
    this.#oscillators[frequency].start(this.#context.currentTime);
  }

  stopNote(note) {
    let frequency = this.#midiNoteToFrequency(note);
    this.#oscillators[frequency].stop(this.#context.currentTime);
    this.#oscillators[frequency].disconnect();
  }

  stopAllNotes() {
    for (const property in this.#oscillators) {
      let frequency = this.#oscillators[property];
      frequency.stop(this.#context.currentTime);
      frequency.disconnect();
    }
  }
}
