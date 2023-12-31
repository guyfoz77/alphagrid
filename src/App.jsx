import './App.scss'
// import { Test } from './components/Test'
import { useState } from 'react'
import { Board } from './components/Board'
import { SpareLetters } from './components/SpareLetters'
import { testBoard } from './data'
import { InitGameState } from './scripts/boardScripts'
import { LetterObject } from './scripts/boardScripts'
import _ from 'lodash'

function App() {
  const [gameState, setGameState] = useState(new InitGameState(testBoard))

  function handleBoardTileClick(colRow) {
    const newGameState = _.cloneDeep(gameState)
    newGameState.activeTile = colRow
    setGameState(newGameState)
  }
  function handleSpareTileClick(letterObject) {
    if (!gameState.activeTile.col) return
    console.log(gameState.activeTile)
    const newGameState = _.cloneDeep(gameState)
    const letterClicked = letterObject.letter
    const activeBoardPosition = newGameState.activeTile
    const letterClickedPosition = letterObject.letterContainerPosition
    console.log(letterObject)
    newGameState.currentBoard[activeBoardPosition.row][
      activeBoardPosition.col
    ] = letterClicked
    newGameState.letters[letterClickedPosition] = new LetterObject(
      letterClicked,
      true,
      activeBoardPosition,
      null
    )
    setGameState(newGameState)
  }

  return (
    <div className="mainContainer">
      <Board
        gameState={gameState}
        handleBoardTileClick={handleBoardTileClick}
      />
      <SpareLetters
        gameState={gameState}
        handleSpareTileClick={handleSpareTileClick}
      />
    </div>
  )
}

export default App
