import './App.scss'
// import { Test } from './components/Test'
import { useState } from 'react'
import { Board } from './components/Board'
import { SpareLetters } from './components/SpareLetters'
import { testBoard } from './data'
import { InitGameState } from './scripts/boardScripts'
// import { LetterObject } from './scripts/boardScripts'
import _ from 'lodash'

function App() {
  const [gameState, setGameState] = useState(new InitGameState(testBoard))

  function handleBoardTileClick(colRow) {
    const newGameState = _.cloneDeep(gameState)
    newGameState.activeTile = colRow
    setGameState(newGameState)
  }

  function handleSpareTileClick(letterObject) {
    if (!`${gameState.activeTile.col}`) return //if no active tile
    const newGameState = _.cloneDeep(gameState)
    const activeTile = newGameState.activeTile
    const indexOfLetterClicked = newGameState.letters.findIndex((letter) => {
      return letter.ID === letterObject.ID
    })
    const indexOfActiveLetter = newGameState.letters.findIndex((letter) => {
      return (
        letter.onBoard &&
        letter.boardPosition.col === newGameState.activeTile.col &&
        letter.boardPosition.row === newGameState.activeTile.row
      )
    })

    //set currentboard, then set the letter.onBoard to true
    newGameState.currentBoard[activeTile.row][activeTile.col] =
      letterObject.letter
    newGameState.letters[indexOfLetterClicked].onBoard = true
    newGameState.letters[indexOfLetterClicked].boardPosition = activeTile

    //if there is a letter currently in the active tile...
    if (indexOfActiveLetter != -1) {
      newGameState.letters[indexOfActiveLetter].onBoard = false
      newGameState.letters[indexOfActiveLetter].boardPosition = null
    }

    const newActiveTile = getNewActiveTile()
    newGameState.activeTile = { ...newActiveTile }
    setGameState(newGameState)
  }

  function getNewActiveTile() {
    //if previousActiveTile is left of the current activeTile, new activeTile is right
    //if previousActiveTile is up of the current activeTile, new activeTile is down
    //if no previous activeTile exists, first check right then check down.
    const newGameState = _.cloneDeep(gameState)
    let newActiveTile = { ...newGameState.activeTile }

    //if we are moving across the board
    if (
      newGameState.previousActiveTile.col ==
      newGameState.activeTile.col - 1
    ) {
      console.log('block 1')
      newActiveTile.col++
      if (newGameState.solution[newActiveTile.row][newActiveTile.col]) {
        newActiveTile = { col: null, row: null }
        newGameState.previousActiveTile = { col: null, row: null }
      }
      newGameState.activeTile = newActiveTile
    }

    //if we are moving down the board
    if (
      newGameState.previousActiveTile.row ==
      newGameState.activeTile.row - 1
    ) {
      console.log('block 2')

      newActiveTile.row++
      if (newGameState.solution[newActiveTile.row][newActiveTile.col]) {
        newActiveTile = { col: null, row: null }
        newGameState.previousActiveTile = { col: null, row: null }
      }
      newGameState.activeTile = newActiveTile
    }

    //if there was no previous active tile (just started moving)
    console.log(`${newGameState.previousActiveTile.col}`)
    if (!`${newGameState.previousActiveTile.col}`) {
      if (
        newGameState.solution[newGameState.activeTile.row][
          newGameState.activeTile.col + 1
        ]
      ) {
        console.log('block 3')

        newActiveTile.col++
      }
      if (
        newGameState.solution[newGameState.activeTile.row + 1][
          newGameState.activeTile.col
        ]
      ) {
        console.log('block 4')

        newActiveTile.row++
      }
    }

    newGameState.previousActiveTile = { ...newGameState.activeTile }

    console.log('new', newActiveTile)
    console.log('prev', newGameState.previousActiveTile)
    return newActiveTile
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
