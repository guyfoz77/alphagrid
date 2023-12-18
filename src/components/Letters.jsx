import '../sass/letterContainer.scss'

export function Letters({ letters, handleOnDrag }) {
  const displayLetters = Array.from(
    { length: Math.max(10, letters.length) },
    (_, index) => letters[index] || ''
  )

  return (
    <div className="letterContainer">
      {displayLetters.map((letter, index) => (
        <div
          key={index}
          className={`letter ${letter ? 'draggable' : ''}`}
          draggable={!!letter}
          onDragStart={(e) => letter && handleOnDrag(e, letter, index)}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}
