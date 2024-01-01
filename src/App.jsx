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

  // function getNewActiveTile() {
  //   //if previousActiveTile is left of the current activeTile, new activeTile is right
  //   //if previousActiveTile is up of the current activeTile, new activeTile is down
  //   //if no previous activeTile exists, first check right then check down.
  //   const newGameState = _.cloneDeep(gameState)
  //   let newActiveTile = { ...newGameState.activeTile }
  //   const currentActiveTile = { ...newGameState.activeTile }
  //   console.log('activetile', newGameState.activeTile)

  //   //if we are moving across the board
  //   if (newGameState.previousActiveTile.col == currentActiveTile.col - 1) {
  //     console.log('block 1')
  //     newActiveTile.col++
  //     if (!newGameState.solution[newActiveTile.row][newActiveTile.col]) {
  //       newActiveTile = { col: '', row: '' }
  //       newGameState.previousActiveTile = { col: '', row: '' }
  //     }
  //     newGameState.activeTile = newActiveTile
  //     newGameState.previousActiveTile = { ...currentActiveTile }
  //     return newActiveTile
  //   }

  //   //if we are moving down the board
  //   if (!newGameState.previousActiveTile.row == currentActiveTile.row - 1) {
  //     console.log('block 2')

  //     newActiveTile.row++
  //     if (newGameState.solution[newActiveTile.row][newActiveTile.col]) {
  //       newActiveTile = { col: '', row: '' }
  //       newGameState.previousActiveTile = { col: '', row: '' }
  //     }
  //     newGameState.activeTile = newActiveTile
  //     newGameState.previousActiveTile = { ...currentActiveTile }
  //     return newActiveTile
  //   }

  //   //if there was no previous active tile (just started moving)
  //   console.log(`${newGameState.previousActiveTile.col}`)
  //   if (!`${newGameState.previousActiveTile.col}`) {
  //     if (
  //       newGameState.solution[currentActiveTile.row][currentActiveTile.col + 1]
  //     ) {
  //       console.log('block 3')

  //       newActiveTile.col++
  //     }
  //     if (
  //       newGameState.solution[currentActiveTile.row + 1][currentActiveTile.col]
  //     ) {
  //       console.log('block 4')

  //       newActiveTile.row++
  //     }
  //   }

  //   newGameState.previousActiveTile = { ...currentActiveTile }
  //   return newActiveTile
  // }

  function getNewActiveTile() {
    const newGameState = _.cloneDeep(gameState)
    let newActiveTile = { ...newGameState.activeTile }
    const currentActiveTile = { ...newGameState.activeTile }
    console.log('activetile', newGameState.activeTile)

    // If moving across the board (to the right)
    if (newGameState.previousActiveTile.col === currentActiveTile.col - 1) {
      console.log('block 1')
      newActiveTile.col++

      if (newGameState.solution[newActiveTile.row][newActiveTile.col]) {
        newActiveTile = { col: '', row: '' }
        newGameState.previousActiveTile = { col: '', row: '' }
      }

      newGameState.activeTile = newActiveTile
      newGameState.previousActiveTile = { ...currentActiveTile }
      return newActiveTile
    }

    // If moving down the board
    if (newGameState.previousActiveTile.row === currentActiveTile.row - 1) {
      console.log('block 2')
      newActiveTile.row++

      if (newGameState.solution[newActiveTile.row][newActiveTile.col]) {
        newActiveTile = { col: '', row: '' }
        newGameState.previousActiveTile = { col: '', row: '' }
      }

      newGameState.activeTile = newActiveTile
      newGameState.previousActiveTile = { ...currentActiveTile }
      return newActiveTile
    }

    // If there was no previous active tile (just started moving)
    console.log(`${newGameState.previousActiveTile.col}`)
    if (!newGameState.previousActiveTile.col) {
      console.log('block 3')

      if (
        newGameState.solution[currentActiveTile.row][currentActiveTile.col + 1]
      ) {
        newActiveTile.col++
      }

      console.log('block 4')
      if (
        newGameState.solution[currentActiveTile.row + 1][currentActiveTile.col]
      ) {
        newActiveTile.row++
      }
    }

    newGameState.previousActiveTile = { ...currentActiveTile }
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
