import React from 'react';
import style from './style.scss';
import Card from '../Card/Card';

const GameField = ({onNewGame, score, cards, onCardClick}) => (
    <div className={style.gamefield}>
        <div className={style.menu}>
            <button className={style.btn} onClick={onNewGame}>Начать заново</button>
            <div>Очки: <span className={style.score}>{score}</span></div>
        </div>
        <ul className={style.cards}>
            { cards.map(card => <Card key={card.id}
                                      id={card.id}
                                      type={card.type}
                                      img={card.img}
                                      backImg={card.backImg}
                                      face={card.face}
                                      guessed={card.guessed}
                                      block={card.block}
                                      onClick={onCardClick}/>) }
        </ul>
    </div>
);

export default GameField;