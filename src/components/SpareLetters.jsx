import '../sass/letterContainer.scss'

function LetterTile({ letterObject, handleSpareTileClick }) {
  return (
    <div
      className="letterTile letter"
      onClick={() => handleSpareTileClick(letterObject)}
    >
      <h3>{letterObject.letter}</h3>
    </div>
  )
}

export function SpareLetters({ gameState, handleSpareTileClick }) {
  const letters = [...gameState.letters]
  const lettersToDisplay = letters.filter((letter) => {
    if (!letter.onBoard) return letter
  })

  return (
    <div className="letterContainer">
      {lettersToDisplay.map((letter, index) => (
        <LetterTile
          letterObject={letter}
          key={index}
          handleSpareTileClick={handleSpareTileClick}
        />
      ))}
    </div>
  )
}
