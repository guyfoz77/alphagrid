import './App.scss'
// import { Test } from './components/Test'
import { Board } from './components/Board'
import { testBoard } from './data'
import { boardBuild } from './scripts/boardBuilder'

function App() {
  const newBoard = boardBuild(testBoard)

  return (
    <>
      <Board board={newBoard} />
    </>
  )
}

export default App
