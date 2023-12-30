import '../sass/Board.scss'

function Tile({
  letter,
  currentLetter,
  handleBoardTileClick,
  colRow,
  isActiveTile,
}) {
  return letter ? (
    <div
      className={isActiveTile ? 'boardLetter active' : 'boardLetter occupied'}
      onClick={() => handleBoardTileClick(colRow)}
    >
      {currentLetter}{' '}
    </div>
  ) : (
    <div className="boardLetter blank"></div>
  )
}

function BoardRow({
  row,
  currentRow,
  handleBoardTileClick,
  rowNumber,
  activeTile,
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
        />
      ))}
    </div>
  )
}
