export function LetterTile({ letterObject }) {
  return (
    <div className="letterTile" draggable>
      <h3>{letterObject.letter}</h3>
    </div>
  )
}
