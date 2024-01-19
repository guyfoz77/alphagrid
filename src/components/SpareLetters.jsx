import '../sass/letterContainer.scss'

function LetterTile({ letterObject, handleSpareTileClick, index }) {
  return !letterObject.onBoard ? (
    <div
      className="letterTile letter"
      onClick={() => handleSpareTileClick(letterObject, index)}
    >
      {letterObject.letter}
    </div>
  ) : (
    <div className="letterTile letter inactive">{letterObject.letter}</div>
  )
}

export function SpareLetters({ gameState, handleSpareTileClick }) {
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
    </div>
  )
}
