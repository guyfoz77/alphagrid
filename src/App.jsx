import './App.scss'
// import { Test } from './components/Test'
import { useState } from 'react'
import { Board } from './components/Board'
import { Letters } from './components/Letters'
import { testBoard } from './data'
import { BoardObject } from './scripts/boardScripts'
// import { produce } from 'immer'

function App() {
  // const newBoard = getBoard(testBoard)
  const [board, setBoard] = useState(new BoardObject(testBoard))
  // const [spareLetters, setSpareLetters] = useState(getSpareLetters(board))

  // function getSpareLetters(boardToCompare) {
  //   const spareLetters = []
  //   for (let i = 0; i < boardToCompare.solution.length; i++) {
  //     for (let j = 0; j < boardToCompare.solution[i].length; j++) {
  //       if (
  //         boardToCompare.currentBoard[i][j].letter !==
  //         boardToCompare.solution[i][j]
  //       ) {
  //         spareLetters.push(boardToCompare.solution[i][j])
  //       }
  //     }
  //   }
  //   return spareLetters
  // }
  // function removeUsedLetter(index) {
  //   const newSpareLetters = [...spareLetters]
  //   newSpareLetters.splice(index, 1)
  //   // console.log(newSpareLetters)
  //   setSpareLetters(newSpareLetters)
  // }
  function cloneboard() {
    const newBoard = board.currentBoard.map((row) => {
      const newRow = []
      for (let i = 0; i < row.length; i++) {
        newRow.push(row[i].letter)
      }
      return newRow
    })
    return newBoard
  }

  function handleOnDrag(e, letter, index) {
    e.dataTransfer.setData('letter', letter)
    e.dataTransfer.setData('index', index)
  }
  function handleOnDragBoard(e, letter, rowIndex, index) {
    e.dataTransfer.setData('letter', letter)
    const newBoard = cloneboard()
    newBoard[rowIndex][index] = ''
    const newBoardRaw = {
      solution: board.solution,
      start: newBoard,
    }
    setBoard(new BoardObject(newBoardRaw))
  }
  function handleOnDropBoard(e, rowIndex, index) {
    // e.preventDefault()
    const letter = e.dataTransfer.getData('letter')
    // const indexInSpareLetters = e.dataTransfer.getData('index')
    const newBoard = cloneboard()
    newBoard[rowIndex][index] = letter
    const newBoardRaw = {
      solution: board.solution,
      start: newBoard,
    }
    const newBoardObject = new BoardObject(newBoardRaw)
    setBoard(newBoardObject)
    // removeUsedLetter(indexInSpareLetters)
  }
  function handleDragOver(e) {
    e.preventDefault()
  }

  return (
    <div className="mainContainer">
      <Board
        board={board.currentBoard}
        handleOnDropBoard={handleOnDropBoard}
        handleDragOver={handleDragOver}
        handleOnDragBoard={handleOnDragBoard}
      />
      <Letters letters={board.startSpareLetters} handleOnDrag={handleOnDrag} />
    </div>
  )
}

export default App
