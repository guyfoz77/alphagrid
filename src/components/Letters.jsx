import '../sass/letterContainer.scss'

export function Letters({ letters, handleOnDrag }) {
  return (
    <div className="letterContainer">
      {letters.map((letter, index) => (
        <div
          draggable={true}
          className="letter"
          key={index}
          onDragStart={(e) => handleOnDrag(e, letter)}
        >
          {letter}
        </div>
      ))}
    </div>
  )
}
