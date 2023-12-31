// function Tile(letter, row, col, willContainLetter) {
//   //tile constuctor
//   return {
//     letter: letter,
//     row: row,
//     col: col,
//     willContainLetter: willContainLetter,
//     active: false,
//   }
// }

function shuffleArray(array) {
  //Fisher–Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export class LetterObject {
  constructor(letter, onBoard, boardPosition, letterContainerPosition) {
    this.letter = letter
    this.onBoard = onBoard
    this.boardPosition = boardPosition
    this.letterContainerPosition = letterContainerPosition
  }
}

export class InitGameState {
  constructor(boardRaw) {
    this.currentBoard = boardRaw.current
    this.solution = boardRaw.solution
    this.letters = this.getLetters(boardRaw)
    this.activeTile = { col: '', row: '' }
  }

  getLetters(boardRaw) {
    const letters = []

    //find letters already on board
    for (let i = 0; i < boardRaw.current.length; i++) {
      for (let j = 0; j < boardRaw.current[i].length; j++) {
        if (boardRaw.current[i][j]) {
          const boardPosition = {
            col: j,
            row: i,
          }
          letters.push(
            new LetterObject(boardRaw.current[i][j], true, boardPosition, null)
          )
        }
      }
    }
    //find letters not on board
    const allLetters = []
    const lettersOnBoard = []

    for (let i = 0; i < boardRaw.solution.length; i++) {
      for (let j = 0; j < boardRaw.solution[i].length; j++) {
        if (boardRaw.solution[i][j]) allLetters.push(boardRaw.solution[i][j])
      }
    }
    for (let i = 0; i < boardRaw.current.length; i++) {
      for (let j = 0; j < boardRaw.current[i].length; j++) {
        if (boardRaw.current[i][j]) lettersOnBoard.push(boardRaw.current[i][j])
      }
    }
    const spareLetters = [...allLetters]
    lettersOnBoard.forEach((letter) => {
      spareLetters.splice(spareLetters.indexOf(letter), 1)
    })
    shuffleArray(spareLetters)
    for (let i = 0; i < spareLetters.length; i++) {
      letters.push(new LetterObject(spareLetters[i], false, null, i))
    }
    return letters
  }
}
