// import * as m  from "./move.js";
import Move from './move.js';

export default class GameViewModel {
    constructor() {
        this.tries = ko.observable(0);
        this.counter = ko.observable(60);
        this.secret = this.createSecret();
        this.guess = ko.observable("123");
        this.history = ko.observableArray([]);
        this.wins = ko.observable(0);
        this.loses = ko.observable(0);
        this.pbCounter = ko.computed(() => {
            return (this.counter() * 10 / 6) + '%';
        });
        this.pbClass = ko.computed(() => {
            let clazz = "progress-bar progress-bar-success";
            if (this.counter() < 20)
                clazz = "progress-bar progress-bar-danger";
            else if (this.counter() < 40)
                clazz = "progress-bar progress-bar-warning";
            return clazz;
        });

        this.total = ko.computed(() => {
            return this.wins() + this.loses();
        });
        this.countDown = this.countDown.bind(this);
        this.play = this.play.bind(this);
        this.createSecret = this.createSecret.bind(this);
        this.createDigit = this.createDigit.bind(this);
        this.initGame = this.initGame.bind(this);
        this.createMove = this.createMove.bind(this);
        setInterval(this.countDown, 1000);
    }

    countDown() {
        this.counter(this.counter() - 1);
        if (this.counter() <= 0) {
            this.loses(this.loses() + 1);
            let move = new Move(this.secret, "Time is out!");
            this.initGame();
            this.history.push(move);
        }
    }

    play() {
        if (this.secret == this.guess()) {
            this.wins(this.wins() + 1);
            this.initGame();
            this.history.push(new Move(this.guess(), "You win!"));
        } else {
            this.tries(this.tries() + 1);
            this.history.push(this.createMove());
        }
    }

    createSecret() {
        let number = [];
        number.push(this.createDigit(1, 9));
        while (number.length != 3) {
            let num = this.createDigit(0, 9);
            if (!number.includes(num))
                number.push(num);
        }
        return number.reduce((n, d) => n + d, '');
    }

    createDigit(min, max) {
        return Math.floor(Math.random() * (max - min + 1))
            + min;
    }

    initGame() {
        this.tries(0);
        this.counter(60);
        this.history([]);
        this.secret = this.createSecret();
    }

    createMove() {
        let perfectMatch = 0, partialMatch = 0;
        for (let i = 0; i < this.secret.length; ++i) {
            let s = this.secret.charAt(i);
            for (let j = 0; j < this.guess().length; ++j) {
                let g = this.guess().charAt(j);
                if (s === g) {
                    if (i === j) ++perfectMatch;
                    else --partialMatch;
                }
            }
        }
        if (perfectMatch === partialMatch) return new Move(this.guess(), "No Match!", false);
        let msg = "";
        if (perfectMatch > 0) msg += perfectMatch;
        if (partialMatch < 0) msg += partialMatch;
        return new Move(this.guess(), msg, false, perfectMatch, partialMatch);
    }
};