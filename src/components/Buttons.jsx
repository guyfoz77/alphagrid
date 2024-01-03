import backspaceSVG from '../assets/backspace_FILL0_wght400_GRAD0_opsz24.svg'
import checkSVG from '../assets/input_FILL0_wght400_GRAD0_opsz24.svg'
import '../sass/Buttons.scss'

export function Buttons({ handleBackspaceClick, handleCheckClick }) {
  return (
    <div className="functionsContainer">
      <Backspace handleBackspaceClick={handleBackspaceClick} />
      <Check handleCheckClick={handleCheckClick} />
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

function Check({ handleCheckClick }) {
  return (
    <div className="functionButton" onClick={handleCheckClick}>
      <img src={checkSVG} alt="Check answers button" />
    </div>
  )
}
