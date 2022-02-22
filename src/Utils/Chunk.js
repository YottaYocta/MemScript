export default class Chunk {
  constructor(number, text) {
    this.number = number;
    this.nextReview = number / 2.0;
    this.strength = 0;
    this.text = text;
  }

  getWords() {
    return this.text.split(" ").length;
  }
}

export function sortChunk(a, b) {
  let diff = a.nextReview - b.nextReview;
  return Math.abs(diff) > 0.001 ? diff : a.strength - b.strength;
}

export function rechunk(script, size) {
  let chunks = [];
  let count = 0;
  let sentences = script.split(".");
  for (let i = 0; i < sentences.length; i += size) {
    let text = "";
    for (let j = 0; j < size; j++) {
      if (i + j < sentences.length) {
        text += sentences[i + j] + ". ";
      }
    }
    chunks.push(new Chunk(count, text));
    count++;
  }
  return chunks;
}
