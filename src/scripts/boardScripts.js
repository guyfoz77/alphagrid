function Tile(letter, row, col, willContainLetter) {
  //tile constuctor
  return {
    letter: letter,
    row: row,
    col: col,
    willContainLetter: willContainLetter,
    active: false,
  }
}
// export function BoardObject(boardRaw) {
//   //this function converts each letter in the board into an object
//   const newBoard = []
//   for (let i = 0; i < boardRaw.solution.length; i++) {
//     const newRow = []
//     for (let j = 0; j < boardRaw.solution[i].length; j++) {
//       //buildrow
//       let willContainLetter = false
//       if (boardRaw.solution[i][j]) {
//         willContainLetter = true
//       }
//       newRow.push(new Tile(boardRaw.start[i][j], i, j, willContainLetter))
//     }
//     newBoard.push(newRow)
//   }
//   const getSpareLetters = () => {
//     const spareLetters = []
//     for (let i = 0; i < boardRaw.solution.length; i++) {
//       for (let j = 0; j < boardRaw.solution[i].length; j++) {
//         if (newBoard[i][j].letter !== boardRaw.solution[i][j]) {
//           spareLetters.push(boardRaw.solution[i][j])
//         }
//       }
//     }
//     return spareLetters
//   }
//   return {
//     currentBoard: newBoard,
//     solution: boardRaw.solution,
//     getSpareLetters: getSpareLetters,
//   }
// }

function shuffleArray(array) {
  //Fisher–Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export class BoardObject {
  constructor(boardRaw) {
    this.currentBoard = this.buildBoard(boardRaw)
    this.solution = boardRaw.solution
    this.startSpareLetters = this.getSpareLetters(boardRaw)
  }

  getSpareLetters(boardRaw) {
    const allLetters = []
    const lettersOnBoard = []

    for (let i = 0; i < boardRaw.solution.length; i++) {
      for (let j = 0; j < boardRaw.solution[i].length; j++) {
        if (boardRaw.solution[i][j]) allLetters.push(boardRaw.solution[i][j])
      }
    }
    for (let i = 0; i < boardRaw.start.length; i++) {
      for (let j = 0; j < boardRaw.start[i].length; j++) {
        if (boardRaw.start[i][j]) lettersOnBoard.push(boardRaw.start[i][j])
      }
    }
    const spareLetters = [...allLetters]
    lettersOnBoard.forEach((letter) => {
      spareLetters.splice(spareLetters.indexOf(letter), 1)
    })
    shuffleArray(spareLetters)
    return spareLetters
  }

  buildBoard(boardRaw) {
    const newBoard = []
    for (let i = 0; i < boardRaw.solution.length; i++) {
      const newRow = []
      for (let j = 0; j < boardRaw.solution[i].length; j++) {
        let willContainLetter = false
        if (boardRaw.solution[i][j]) {
          willContainLetter = true
        }
        newRow.push(new Tile(boardRaw.start[i][j], i, j, willContainLetter))
      }
      newBoard.push(newRow)
    }
    return newBoard
  }
}
