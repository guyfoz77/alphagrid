import backspaceSVG from '../assets/backspace_FILL0_wght400_GRAD0_opsz24.svg'
import '../sass/Buttons.scss'

export function Buttons({ handleBackspaceClick }) {
  return (
    <div className="functionsContainer">
      <Backspace handleBackspaceClick={handleBackspaceClick} />
    </div>
  )
}

function Backspace({ handleBackspaceClick }) {
  return (
    <div className="functionButton" onClick={handleBackspaceClick}>
      <img src={backspaceSVG} alt="Backspace button" />
    </div>
  )
}
