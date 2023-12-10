import './App.scss'
// import { Test } from './components/Test'
import { Board } from './components/Board'
import { testBoard } from './data'

function App() {

  return (
    <>
      <Board board={testBoard} />
    </>
  )
}

export default App
