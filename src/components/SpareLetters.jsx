import '../sass/letterContainer.scss'

// export function xSpareLetters({ letters, handleOnDrag }) {
//   const displayLetters = Array.from(
//     { length: Math.max(10, letters.length) },
//     (_, index) => letters[index] || ''
//   )

//   return (
//     <div className="letterContainer">
//       {displayLetters.map((letter, index) => (
//         <div
//           key={index}
//           className={`letter ${letter ? 'draggable' : ''}`}
//           draggable={!!letter}
//           onDragStart={(e) => letter && handleOnDrag(e, letter, index)}
//         >
//           {letter}
//         </div>
//       ))}
//     </div>
//   )
// }

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

  console.log(letters)
  return (
    <div className="letterContainer">
      {lettersToDisplay.map((letter, index) => (
        <LetterTile letterObject={letter} key={index} />
      ))}
    </div>
  )
}
