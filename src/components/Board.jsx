import { testBoard } from '../data'
import '../sass/Board.scss'



function BoardRow({ row }) {
  return (
    <div className="boardRow"> {
      row.map((letter, index) => (
        letter ?
          <div className="boardLetter occupied" key={index}>{letter}</div> :
          <div className="boardLetter blank" key={index}>{letter}</div>

      ))}
    </div>
  )
}

export function Board({ board }) {
  function Letter(letter, row, col, willContainLetter) {
    return {
      letter: letter,
      row: row,
      col: col,
      willContainLetter: willContainLetter,
      active: false
    }
  }
  function boardBuild(board) { //this function converts each letter in the board into an object
    const newBoard = []
    for (let i = 0; i < board.solution.length; i++) {
      const newRow = []
      for (let j = 0; j < board.solution[i].length; j++) { //buildrow
        let willContainLetter = false
        if (board.solution[i][j]) {
          willContainLetter = true
        }
        newRow.push(
          new Letter(
            board.start[i][j],
            i,
            j,
            willContainLetter
          )
        )
      }
      newBoard.push(newRow)
    }
    return newBoard
  }

  return (
    <div className="board">{
      board.map((row, index) => (
        <BoardRow row={row} key={index} />
      ))
    }
    </div>
  )
}

