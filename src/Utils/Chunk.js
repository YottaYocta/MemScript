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
  return Math.abs(diff) > 0.001 ? diff : a.number - b.number;
}
