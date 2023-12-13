import '../sass/Board.scss'

function BoardRow({ row, handleOnDrop, handleDragOver }) {
  return (
    <div className="boardRow">
      {' '}
      {row.map((tile, index) =>
        tile.willContainLetter ? (
          <div
            className="boardLetter occupied"
            key={index}
            onDrop={(e) => handleOnDrop(e)}
            onDragOver={(e) => handleDragOver(e)}
          >
            {tile.letter}
          </div>
        ) : (
          <div className="boardLetter blank" key={index}>
            {tile.letter}
          </div>
        )
      )}
    </div>
  )
}

export function Board({ board, handleOnDrop, handleDragOver }) {
  return (
    <div className="board">
      {board.map((row, index) => (
        <BoardRow
          row={row}
          key={index}
          handleOnDrop={handleOnDrop}
          handleDragOver={handleDragOver}
        />
      ))}
    </div>
  )
}
