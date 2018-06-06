import React from 'react';
import style from './Card.scss';

const Card = ({face, guessed, block, onClick, backImg, type, front, img, id}) => {
    const classes = [style.card];
    
    if (face) classes.push(style['card--open']);
    if (guessed) classes.push(style['card--guessed']);
    if (block) classes.push(style['card--blocked']);

    return (
    <div className={classes.join(' ')} onClick={() => onClick(id)}>
        <img src={backImg} alt={`${type}-back`}/>
        <img className={style.front} src={img} alt={type}/>
    </div>
    );
};

export default Card;