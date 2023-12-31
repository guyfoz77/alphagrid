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
  // function removeBoardLetter(letter) {
  //   //a function that will return a letter to sparetiles when removed from board
  //   const newGameState = _.cloneDeep(gameState)
  //   const updatedLetters = newGameState.letters.map((letterObject) => {
  //     if (letterObject.letter === letter && letterObject.onBoard) {
  //       const newLetterObject = _.cloneDeep(letterObject)
  //       newLetterObject.onBoard = false
  //       newLetterObject.boardPosition = null
  //       return newLetterObject
  //     }
  //     return letterObject
  //   })
  //   console.log(updatedLetters)
  //   return updatedLetters
  // }

  function handleSpareTileClick(letterObject, key) {
    if (!`${gameState.activeTile.col}`) return //this needs converting to string as it detects 0 as falsy unless a string
    const newGameState = _.cloneDeep(gameState)
    const newLetters = _.cloneDeep(gameState.letters)
    const letterClicked = letterObject.letter
    const activeBoardPosition = newGameState.activeTile
    const activeLetter = newGameState.letters.find(
      (letterObjectX) =>
        letterObjectX.onBoard &&
        letterObjectX.boardPosition.col === newGameState.activeTile.col &&
        letterObjectX.boardPosition.row === newGameState.activeTile.row
    )
    newGameState.currentBoard[activeBoardPosition.row][ //add letter to board
      activeBoardPosition.col
    ] = letterClicked
    const clickedLetterArrayPosition = key //double check this. is the fact that the array is randomised going to affect this?
    const newBoardLetter = new LetterObject(
      newLetters[clickedLetterArrayPosition].letter,
      true,
      {
        col: activeBoardPosition.col,
        row: activeBoardPosition.row,
      }
    )
    newLetters[clickedLetterArrayPosition] = newBoardLetter

    if (activeLetter) {
      const activeLetterArrayPosition = newLetters.findIndex((letterObject) => {
        return (
          letterObject.onBoard &&
          letterObject.boardPosition.col === newGameState.activeTile.col &&
          letterObject.boardPosition.row === newGameState.activeTile.row
        )
      })
      console.log(activeLetterArrayPosition)
      const newSpareLetter = new LetterObject(
        newLetters[activeLetterArrayPosition].letter,
        false,
        null
      )

      newLetters[activeLetterArrayPosition] = newSpareLetter
    }
    console.log(clickedLetterArrayPosition)
    newGameState.letters = newLetters

    //if an active letter is present (selected box contains letter)
    //-search through letters and remove the first instance of the letter
    //on board and matching the active letter
    //-push this same letter through to the letters array as a spare letter
    // (onBoard false)
    //-take the first instance of the clicked letter that is off board and add to board
    console.log(newGameState)
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
