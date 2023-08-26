import React from 'react';
import classes from "./Button.module.css";

const Button = (props) => {

  return (
    <button className={classes.btn} onClick={props.onBtnClick}>
      {props.text}
    </button>
  )
}

export default Button
