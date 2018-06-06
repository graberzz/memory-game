import React from 'react';
import style from './style.scss';

const Button = ({onClick, text}) => (
    <button className={style.btn} onClick={onClick}>{text}</button>
);

export default Button;