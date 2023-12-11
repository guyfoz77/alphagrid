import '../sass/Board.scss'

function BoardRow({ row }) {
  return (
    <div className="boardRow"> {
      row.map((tile, index) => (
        tile.willContainLetter ?
          <div className="boardLetter occupied" key={index}>{tile.letter}</div> :
          <div className="boardLetter blank" key={index}>{tile.letter}</div>

      ))}
    </div>
  )
}

export function Board({ board }) {
  return (
    <div className="board">{
      board.map((row, index) => (
        <BoardRow row={row} key={index} />
      ))
    }
    </div>
  )
}

