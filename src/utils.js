export const gameStates = {
    START: 0,
    IN_PROGRESS: 1,
    FINISH: 2,
};

export const CARD_PAIRS = 9;

export const MAGIC_MULTIPLIER = 42;
 
export const cardTypes = ['2C', '2D', '2H', '2S',
                          '3C', '3D', '3H', '3S',
                          '4C', '4D', '4H', '4S',
                          '5C', '5D', '5H', '5S',
                          '6C', '6D', '6H', '6S',
                          '7C', '7D', '7H', '7S',
                          '8C', '8D', '8H', '8S',
                          '9C', '9D', '9H', '9S',
                          '0C', '0D', '0H', '0S',
                          'JC', 'JD', 'JH', 'JS',
                          'QC', 'QD', 'QH', 'QS',
                          'KC', 'KD', 'KH', 'KS',
                          'AC', 'AD', 'AH', 'AS',
];

// random number between [min, max)
const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

const shuffle = (array) => {
    const a = [...array];

    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = a[i];
        a[i] = a[j];
        a[j] = x;
    }

    return a;
};

export const randomCardPairs = (types = cardTypes, cardPairsAmount = CARD_PAIRS) => {
    const cards = [];
    while (cards.length < cardPairsAmount) {
        const cardType = types[random(0, types.length)];        
        if (cards.find(card => card.type === cardType)) continue;
        
        cards.push({
            type: cardType,
            face: true,
            guessed: false,
            block: true,
            img: require(`./img/cards/${cardType}.png`),
            backImg: require('./img/cards/back.png'),
        });    
    }

    return shuffle([...cards, ...cards].map((card, index) => ({...card, id: index})));
};