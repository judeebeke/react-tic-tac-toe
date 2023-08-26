import React from 'react';
import Box from './Box';
import classes from "./Boxes.module.css";

const Boxes = ({boxes, setBoxValue, isJackpot, gameover}) => {
    const createBox = boxes.map((item) => <Box key={item.id} value={item.value} jackpot={isJackpot && item.jackpot} setClose={item.open} onBoxClick={()=>{setBoxValue(item.id)}} isGameover={gameover} />)
        
    return (
    <div className={classes.boxes}>
        {createBox}  
      </div>
  )
}

export default Boxes;