import './App.scss'
// import { Test } from './components/Test'
import { useState } from 'react'
import { Board } from './components/Board'
import { SpareLetters } from './components/SpareLetters'
import { Buttons } from './components/Buttons'
import { testBoard } from './data'
import { InitGameState } from './scripts/boardScripts'
// import { LetterObject } from './scripts/boardScripts'
import _ from 'lodash'

function App() {
  const [gameState, setGameState] = useState(new InitGameState(testBoard))

  function handleBoardTileClick(colRow) {
    const newGameState = _.cloneDeep(gameState)
    newGameState.activeTile = colRow
    newGameState.previousActiveTiles.push({ row: '', col: '' })
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

    newGameState.currentBoard[activeTile.row][activeTile.col] =
      letterObject.letter
    newGameState.letters[indexOfLetterClicked].onBoard = true
    newGameState.letters[indexOfLetterClicked].boardPosition = activeTile

    //if there is a letter currently in the active tile...
    if (indexOfActiveLetter != -1) {
      newGameState.letters[indexOfActiveLetter].onBoard = false
      newGameState.letters[indexOfActiveLetter].boardPosition = null
    }

    let newActiveTile = getNewActiveTile(newGameState)
    newGameState.previousActiveTiles.push({ ...newGameState.activeTile })
    newGameState.activeTile = { ...newActiveTile }

    while (
      newGameState.correctTiles[newGameState.activeTile.row] &&
      newGameState.correctTiles[newGameState.activeTile.row][
        newGameState.activeTile.col
      ]
    ) {
      newActiveTile = getNewActiveTile(newGameState)
      newGameState.previousActiveTiles.push({ ...newGameState.activeTile })
      newGameState.activeTile = { ...newActiveTile }
    }

    setGameState(newGameState)
  }

  function getNewActiveTile(gameState) {
    const newGameState = _.cloneDeep(gameState)
    let newActiveTile = { ...newGameState.activeTile }
    const currentActiveTile = { ...newGameState.activeTile }
    const previousActiveTile = {
      ...newGameState.previousActiveTiles[
        newGameState.previousActiveTiles.length - 1
      ],
    }

    // If moving across the board (to the right)
    if (previousActiveTile.col === currentActiveTile.col - 1) {
      newActiveTile.col++
      if (!newGameState.solution[newActiveTile.row][newActiveTile.col]) {
        newActiveTile.col--
        if (newGameState.solution[newActiveTile.row + 1][newActiveTile.col]) {
          newActiveTile.row++
        } else newActiveTile = { row: '', col: '' }
      }
      return newActiveTile
    }

    // If moving down the board
    if (previousActiveTile.row === currentActiveTile.row - 1) {
      newActiveTile.row++
      if (!newGameState.solution[newActiveTile.row]) {
        newActiveTile.row--
        if (newGameState.solution[newActiveTile.row][newActiveTile.col + 1]) {
          newActiveTile.col++
        } else newActiveTile = { row: '', col: '' }
      }
      return newActiveTile
    }

    // If there was no previous active tile (just started moving)
    if (!previousActiveTile.col) {
      if (
        newGameState.solution[currentActiveTile.row][currentActiveTile.col + 1]
      ) {
        newActiveTile.col++
        return newActiveTile
      }

      if (
        newGameState.solution[currentActiveTile.row + 1] &&
        newGameState.solution[currentActiveTile.row + 1][currentActiveTile.col]
      ) {
        newActiveTile.row++
        return newActiveTile
      }
    }
    return newActiveTile
  }

  function handleBackspaceClick() {
    const newGameState = _.cloneDeep(gameState)
    const previousActiveTile = newGameState.previousActiveTiles.pop()
    let newActiveTile = { ...previousActiveTile }
    // if (!`${previousActiveTile.col}`) return
    if (!`${newGameState.activeTile.col}`) return
    const indexOfActiveLetter = newGameState.letters.findIndex((letter) => {
      return (
        letter.onBoard &&
        letter.boardPosition.col === newGameState.activeTile.col &&
        letter.boardPosition.row === newGameState.activeTile.row
      )
    })
    const indexOfPreviousLetter = newGameState.letters.findIndex((letter) => {
      return (
        letter.onBoard &&
        letter.boardPosition.col === previousActiveTile.col &&
        letter.boardPosition.row === previousActiveTile.row
      )
    })

    if (indexOfPreviousLetter != -1) {
      newGameState.letters[indexOfPreviousLetter].onBoard = false
      newGameState.letters[indexOfPreviousLetter].boardPosition = null
      newGameState.currentBoard[previousActiveTile.row][
        previousActiveTile.col
      ] = ''
    } else if (indexOfActiveLetter != -1) {
      newGameState.letters[indexOfActiveLetter].onBoard = false
      newGameState.letters[indexOfActiveLetter].boardPosition = null
      newGameState.currentBoard[newGameState.activeTile.row][
        newGameState.activeTile.col
      ] = ''
      newActiveTile = { ...newGameState.activeTile }
    }
    newGameState.activeTile = { ...newActiveTile }
    setGameState(newGameState)
  }

  function handleCheckClick() {
    const newGameState = _.cloneDeep(gameState)
    const newCorrectTiles = []
    newGameState.activeTile = { col: '', row: '' }
    newGameState.previousActiveTiles = [{ col: '', row: '' }]
    for (let i = 0; i < newGameState.currentBoard.length; i++) {
      const newRow = []
      for (let j = 0; j < newGameState.currentBoard[i].length; j++) {
        if (!newGameState.solution[i][j]) {
          newRow.push('')
          continue
        }
        if (newGameState.currentBoard[i][j] === newGameState.solution[i][j]) {
          newRow.push(true)
          continue
        }
        newRow.push(false)
      }
      newCorrectTiles.push(newRow)
    }
    newGameState.correctTiles = newCorrectTiles
    setGameState(newGameState)
  }

  return (
    <div className="mainContainer">
      <Board
        gameState={gameState}
        handleBoardTileClick={handleBoardTileClick}
      />
      <Buttons
        handleBackspaceClick={handleBackspaceClick}
        handleCheckClick={handleCheckClick}
      />
      <SpareLetters
        gameState={gameState}
        handleSpareTileClick={handleSpareTileClick}
      />
    </div>
  )
}

export default App
