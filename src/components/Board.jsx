import '../sass/Board.scss'

function Tile({ letter, currentLetter }) {
  return letter ? (
    <div className="boardLetter occupied">{currentLetter}</div>
  ) : (
    <div className="boardLetter blank"></div>
  )
}

function BoardRow({ row, currentRow }) {
  return (
    <div className="boardRow">
      {row.map((letter, index) => (
        <Tile letter={letter} key={index} currentLetter={currentRow[index]} />
      ))}
    </div>
  )
}

export function Board({ gameState }) {
  return (
    <div className="board">
      {gameState.solution.map((row, index) => (
        <BoardRow
          row={row}
          key={index}
          currentRow={gameState.currentBoard[index]}
        />
      ))}
    </div>
  )
}
