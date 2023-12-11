import './App.scss'
// import { Test } from './components/Test'
import { Board } from './components/Board'
import { testBoard } from './data'
import { getBoard } from './scripts/boardScripts'

function App() {
  const newBoard = getBoard(testBoard)

  return (
    <>
      <Board board={newBoard.currentBoard} />
    </>
  )
}

export default App
