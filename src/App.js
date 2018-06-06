import React from 'react';
import { gameStates, randomCardPairs, MAGIC_MULTIPLIER, CARD_PAIRS } from './utils';
import style from './index.scss';

import Menu from './components/Menu';
import GameField from './components/GameField';

import startImg from './img/StartGame.png';
import startImgRetina from './img/StartGame@2x.png';
import finishImg from './img/Group 2.png';
import finishImgRetina from './img/Group 2@2x.png';

const getInitialState = () => ({
    gameState: gameStates.START,
    score: 0,
    cards: randomCardPairs(),
    openCard: null,
    clickAvailable: false
});

class App extends React.Component {
    state = getInitialState();

    onNewGame = () => {
        // in case user started new game while cards are visible
        clearTimeout(this.newGameTimeout);
        clearTimeout(this.onCardPairRevealTimeout);

        // show cards for 5 seconds
        this.setState({
            ...getInitialState(),
            gameState: gameStates.IN_PROGRESS
        }, _ => {
            // then hide them
            this.newGameTimeout = setTimeout(_ => {
                this.setState({
                    cards: this.state.cards.map(card => ({ ...card, face: false })),
                    clickAvailable: true
                })
            }, 5000);
        });
    }

    onFinish = () => {
        this.setState({
            gameState: gameStates.FINISH
        });
    }

    onCardPairReveal = (cardPair) => {
        const guessed = cardPair[0].type === cardPair[1].type;
        const state = { ...this.state };
        const cards = [...state.cards];
        const cardOne = {
            ...cardPair[0],
            guessed,
            face: false
        };
        const cardTwo = {
            ...cardPair[1],
            guessed,
            face: false
        };

        const cardOneIndex = cards.findIndex(card => card.id === cardOne.id);
        const cardTwoIndex = cards.findIndex(card => card.id === cardTwo.id);
        cards[cardOneIndex] = cardOne;
        cards[cardTwoIndex] = cardTwo;

        this.setState({
            openCard: null,
            cards,
            clickAvailable: true
        }, _ => {
            this.setState({
                score: this.updateScore(guessed, this.state.score, guessed ? 
                                                              this.getUnguessedPairsAmount() : 
                                                              this.getGuessedPairsAmount())
            }, _ => this.isGameFinished() ? this.onFinish() : null);

        });
    }

    updateScore = (guessed, score, pairsAmount) => score + (guessed ? pairsAmount : -pairsAmount) * MAGIC_MULTIPLIER

    isGameFinished = () => this.getGuessedPairsAmount() === CARD_PAIRS

    getGuessedPairsAmount = () => this.state.cards.filter(card => card.guessed).length / 2

    getUnguessedPairsAmount = () => this.state.cards.filter(card => !card.guessed).length / 2

    onCardClick = (id) => {
        const state = { ...this.state },
            cards = [...state.cards],
            openCard = state.openCard === null ? null : { ...state.openCard };

        if (!state.clickAvailable) return;

        let clickedCard = { ...cards.find(card => card.id === id) };
        const clickedCardIndex = cards.findIndex(card => card.id === id);

        if (openCard === null) {
            clickedCard.face = true;
            cards[clickedCardIndex] = clickedCard;
            this.setState({
                cards,
                openCard: clickedCard
            });
            return;
        }

        if (clickedCard.id === openCard.id) return;

        // first show the pair
        clickedCard.face = true;
        cards[clickedCardIndex] = clickedCard;
        state.cards = cards;
        state.clickAvailable = false;
        this.setState({
            ...state
        });
        // 1s later check their type 
        this.onCardPairRevealTimeout = setTimeout(_ => {
            this.onCardPairReveal([clickedCard, openCard]);
        }, 1000);
    }

    render() {
        const { gameState, score, cards } = this.state;

        const mapGameStatesToComponents = {
            [gameStates.START]: <Menu onClick={this.onNewGame}
                text='MEMORY GAME'
                btnText='Начать игру'
                imgs={[startImg, startImgRetina]} />,

            [gameStates.FINISH]: <Menu onClick={this.onNewGame}
                text={`Поздравляем!\nВаш итоговый счет: ${score}`}
                btnText='Еще раз'
                imgs={[finishImg, finishImgRetina]} />,

            [gameStates.IN_PROGRESS]: <GameField cards={cards}
                score={score}
                onCombo={this.onCombo}
                onCardClick={this.onCardClick}
                onNewGame={this.onNewGame} />,
        };

        return (
            <div className={style.app}>
                {mapGameStatesToComponents[gameState]}
            </div>
        );
    }
}

export default App;