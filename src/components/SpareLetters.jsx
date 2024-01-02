import '../sass/letterContainer.scss'
import backspaceSVG from '../assets/backspace_FILL0_wght400_GRAD0_opsz24.svg'

function LetterTile({ letterObject, handleSpareTileClick, index }) {
  return !letterObject.onBoard ? (
    <div
      className="letterTile letter"
      onClick={() => handleSpareTileClick(letterObject, index)}
    >
      <h3>{letterObject.letter}</h3>
    </div>
  ) : (
    <div className="letterTile letter inactive">
      <h3>{letterObject.letter}</h3>
    </div>
  )
}

function Backspace({ handleBackspaceClick }) {
  return (
    <div className="letterTile letter" onClick={handleBackspaceClick}>
      <img src={backspaceSVG} alt="Backspace button" />
    </div>
  )
}

export function SpareLetters({
  gameState,
  handleSpareTileClick,
  handleBackspaceClick,
}) {
  const letters = [...gameState.letters]
  // const lettersToDisplay = letters.filter((letter) => {
  //   if (!letter.onBoard) return letter
  // })

  return (
    <div className="letterContainer">
      {letters.map((letter, index) => (
        <LetterTile
          letterObject={letter}
          key={index}
          index={index}
          handleSpareTileClick={handleSpareTileClick}
        />
      ))}
      <Backspace handleBackspaceClick={handleBackspaceClick} />
    </div>
  )
}
