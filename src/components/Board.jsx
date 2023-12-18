import '../sass/Board.scss'

function BoardRow({
  row,
  rowIndex,
  handleOnDropBoard,
  handleDragOver,
  handleOnDragBoard,
}) {
  return (
    <div className="boardRow">
      {/* {' '} */}
      {row.map((tile, index) =>
        tile.willContainLetter ? (
          <div
            className="boardLetter occupied"
            key={index}
            onDrop={(e) => handleOnDropBoard(e, rowIndex, index)}
            onDragOver={(e) => handleDragOver(e)}
            onDrag={(e) => handleOnDragBoard(e, tile.letter, rowIndex, index)}
            draggable={!!tile.letter}
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

export function Board({
  board,
  handleOnDropBoard,
  handleDragOver,
  handleOnDragBoard,
}) {
  return (
    <div className="board">
      {board.map((row, index) => (
        <BoardRow
          row={row}
          key={index}
          rowIndex={index}
          handleOnDropBoard={handleOnDropBoard}
          handleDragOver={handleDragOver}
          handleOnDragBoard={handleOnDragBoard}
        />
      ))}
    </div>
  )
}
