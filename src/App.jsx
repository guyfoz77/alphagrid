import './App.scss'
// import { Test } from './components/Test'
import { useState } from 'react'
import { Board } from './components/Board'
import { SpareLetters } from './components/SpareLetters'
import { testBoard } from './data'
import { GameState } from './scripts/boardScripts'
// import { produce } from 'immer'

function App() {
  const [gameState, setGameState] = useState(new GameState(testBoard))

  return (
    <div className="mainContainer">
      <Board gameState={gameState} />
      {/* <SpareLetters /> */}
    </div>
  )
}

export default App
