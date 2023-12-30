import '../sass/letterContainer.scss'

function LetterTile({ letterObject }) {
  return (
    <div className="letterTile letter" draggable>
      <h3>{letterObject.letter}</h3>
    </div>
  )
}

export function SpareLetters({ gameState }) {
  const letters = [...gameState.letters]
  const lettersToDisplay = letters.filter((letter) => {
    if (!letter.onBoard) return letter
  })

  return (
    <div className="letterContainer">
      {lettersToDisplay.map((letter, index) => (
        <LetterTile letterObject={letter} key={index} />
      ))}
    </div>
  )
}
