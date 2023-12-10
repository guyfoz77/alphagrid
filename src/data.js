class Word {
  constructor(word) {
    this.word = word
  }
  getWordLength() {
    return this.word.length
  }
}

export const testPattern = {
  words: [new Word('tree'), new Word('enter'), new Word('nature')],
}
