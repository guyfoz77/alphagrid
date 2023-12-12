import './App.scss'
// import { Test } from './components/Test'
import { Board } from './components/Board'
import { Letters } from './components/Letters'
import { testBoard } from './data'
import { getBoard } from './scripts/boardScripts'

function App() {
  const newBoard = getBoard(testBoard)

  return (
    <div className='mainContainer'>
      <Board board={newBoard.currentBoard} />
      <Letters letters={newBoard.getSpareLetters()} />
    </div>
  )
}

export default App
