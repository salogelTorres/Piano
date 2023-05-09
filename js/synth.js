export class Synth {
  #context = null;
  #oscillators = []

  constructor() {
    (this.#context = new AudioContext()), (this.#oscillators = {});
  }

  #midiNoteToFrequency(note) {
    return Math.pow(2, (note - 69) / 12) * 440;
  }

  playNote(note) {
    let frequency = this.#midiNoteToFrequency(note);
    this.#oscillators[frequency] = this.#context.createOscillator();
    this.#oscillators[frequency].frequency.value = frequency;
    this.#oscillators[frequency].connect(this.#context.destination);
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
