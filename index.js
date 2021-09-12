const inquirer = require('inquirer');

let chipOnHand = 0;

const cards = [
    { point: 1, name: 'Ace' },
    { point: 2, name: '2' },
    { point: 3, name: '3' },
    { point: 4, name: '4' },
    { point: 5, name: '5' },
    { point: 6, name: '6' },
    { point: 7, name: '7' },
    { point: 8, name: '8' },
    { point: 9, name: '9' },
    { point: 0, name: '10' },
    { point: 0, name: 'Jack' },
    { point: 0, name: 'Queen' },
    { point: 0, name: 'King' },
];

const suits = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];

let deck = [];

let playerDeck = [];
let playerPoint = 0;
let dealerDeck = [];
let dealerPoint = 0;

const shuffle = () => {
    const random = Math.floor(Math.random() * deck.length);
    const card = deck[random];
    deck.splice(random, 1);
    return card;
}

const play = async () => {
    let answer1 = await inquirer.prompt([
        { name: 'chip', message: 'Please put your bet' },
    ]);

    if (answer1.chip != 5) {
        return;
    }

    deck = [];

    playerDeck = [];
    playerPoint = 0;
    dealerDeck = [];
    dealerPoint = 0;

    suits.map(suit => {
        cards.map(card => {
            deck.push({ name: `${suit}-${card.name}`, point: card.point });
        });
    });

    // deal two cards for player
    for (let i = 0; playerDeck.length < 2; i++) {
        let card = shuffle();
        playerDeck.push(card.name);
        playerPoint += card.point;
    }

    console.log('You got ' + playerDeck.toString());

    // deal two cards for the dealer
    for (let i = 0; dealerDeck.length < 2; i++) {
        let card = shuffle();
        dealerDeck.push(card.name);
        dealerPoint += card.point;
    }

    console.log('The dealer got ' + dealerDeck.toString());

    let retMsg = '';

    if ((playerPoint % 10) > (dealerPoint % 10)) {
        retMsg = 'You won!!!, received 5 chips';
        chipOnHand += 5;
    } else if ((playerPoint % 10) == (dealerPoint % 10)) {
        retMsg = 'You tie with the dealer.';
    } else {
        retMsg = 'You lose the bet';
        chipOnHand -= 5;
    }

    console.log(retMsg);

    let answer2 = await inquirer.prompt([
        { name: 'playMore', message: 'Wanna play more (Yes/No)?' },
    ]);

    if (answer2.playMore == 'Yes') {
        play();
    } else if (answer2.playMore == 'No') {
        console.log(`You got total ${chipOnHand} chips`);
    } else {
        console.log('Exit');
    }
}

play();