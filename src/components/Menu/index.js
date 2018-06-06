import React from 'react';
import style from './style.scss';
import Button from '../Button';

const Menu = ({imgs, text, onClick, btnText}) => (
    <div className={style.menu}>
        <img src={imgs[0]} srcSet={`${imgs[1]} 2x`} alt={text}/>
        <p>{text}</p>
        <Button onClick={onClick} text={btnText}/>
    </div>
);

export default Menu;