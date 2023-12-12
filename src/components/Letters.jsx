import '../sass/letterContainer.scss'

export function Letters({ letters }) {
  return (
    <div className="letterContainer">
      {letters.map((letter, index) => (
        <div className="letter" key={index}>{letter}</div>
      ))}
    </div>
  )
}