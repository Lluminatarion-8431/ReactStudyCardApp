import React from 'react';
import axios from 'axios';
import CardData from './CardData';

class Details extends React.Component {
    constructor(props) {
        super(props);  

    }

    state = {
        cards: [
            {
                word: "",
                definition: ""
            }
        ],

        currentCollection: "",
        selectedCollection: 0,
        currentCard: {word: "", def: ""},
        currentCardNumber: 1,
        numOfCards: 0,
        cardDisplay: "",
        cardFront: true
    };

    