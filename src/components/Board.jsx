import '../sass/Board.scss'

function Tile({
  letter,
  currentLetter,
  handleBoardTileClick,
  colRow,
  isActiveTile,
  correctStatus,
}) {
  if (letter) {
    return (
      <div
        className={
          isActiveTile
            ? `boardLetter active ${correctStatus && 'correct'}`
            : `boardLetter occupied ${correctStatus && 'correct'}`
        }
        onClick={!correctStatus ? () => handleBoardTileClick(colRow) : null}
      >
        {currentLetter}{' '}
      </div>
    )
  } else {
    return <div className="boardLetter blank"></div>
  }
}

function BoardRow({
  row,
  currentRow,
  handleBoardTileClick,
  rowNumber,
  activeTile,
  correctTiles,
}) {
  return (
    <div className="boardRow">
      {row.map((letter, index) => (
        <Tile
          letter={letter}
          key={index}
          currentLetter={currentRow[index]}
          handleBoardTileClick={handleBoardTileClick}
          colRow={{ col: index, row: rowNumber }}
          isActiveTile={
            JSON.stringify(activeTile) ==
            JSON.stringify({ col: index, row: rowNumber })
          }
          correctStatus={correctTiles[rowNumber][index]}
        />
      ))}
    </div>
  )
}

export function Board({ gameState, handleBoardTileClick }) {
  return (
    <div className="board">
      {gameState.solution.map((row, index) => (
        <BoardRow
          row={row}
          key={index}
          rowNumber={index}
          currentRow={gameState.currentBoard[index]}
          handleBoardTileClick={handleBoardTileClick}
          activeTile={gameState.activeTile}
          correctTiles={gameState.correctTiles}
        />
      ))}
    </div>
  )
}
