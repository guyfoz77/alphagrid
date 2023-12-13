import './App.scss'
// import { Test } from './components/Test'
import { useState } from 'react'
import { Board } from './components/Board'
import { Letters } from './components/Letters'
import { testBoard } from './data'
import { getBoard } from './scripts/boardScripts'

function App() {
  // const newBoard = getBoard(testBoard)
  const [board, setBoard] = useState(getBoard(testBoard))

  function handleOnDrag(e, letter) {
    e.dataTransfer.setData('letter', letter)
  }
  function handleOnDrop(e) {
    const letter = e.dataTransfer.getData('letter')
    console.log(letter)
  }
  function handleDragOver(e) {
    e.preventDefault()
  }

  return (
    <div className="mainContainer">
      <Board
        board={board.currentBoard}
        handleOnDrop={handleOnDrop}
        handleDragOver={handleDragOver}
      />
      <Letters letters={board.getSpareLetters()} handleOnDrag={handleOnDrag} />
    </div>
  )
}

export default App
