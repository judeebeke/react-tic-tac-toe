import classes from './Box.module.css';

const Box = ({ value, onBoxClick, setClose, jackpot, isGameover}) => {
  return (
      <div
          className={`${classes.box} ${setClose ? '' : classes.close} ${jackpot ? classes.jackpot : ""} ${isGameover && !jackpot ? classes.gameover : ""}`}
          onClick={onBoxClick}
      >
          {value}
      </div>
  )
}

export default Box
