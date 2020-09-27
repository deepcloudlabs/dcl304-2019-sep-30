class Move {
    constructor(guess, message, announcement=true,perfectMatch=0,partialMatch=0) {
        this.guess = guess;
        this.message = message;
        this.announcement= announcement;
        this.perfectMatch = perfectMatch ;
        this.partialMatch = partialMatch;
    }
}

class GameViewModel {
    constructor() {
        this.tries = 0;
        this.counter = 60;
        this.secret = this.createSecret();
        this.history = [];
        this.countDown = this.countDown.bind(this);
        this.play = this.play.bind(this);
        this.createSecret = this.createSecret.bind(this);
        this.createDigit = this.createDigit.bind(this);
        this.initGame = this.initGame.bind(this);
        this.createMove = this.createMove.bind(this);
    }

    countDown() {
        this.counter--;
        if (this.counter <= 0) {
            let move = new Move(this.secret, "Time is out!");
            this.initGame();
            this.history.push(move);
        }
    }

    play(guess) {
        if (this.secret == guess) {
            this.initGame();
            this.history.push(new Move(guess, "You win!"));
        } else {
            this.tries++;
            this.history.push(this.createMove(guess));
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
        this.tries = 0;
        this.counter = 60;
        this.history.splice(0);
        this.secret = this.createSecret();
    }

    createMove(guess) {
        let perfectMatch = 0, partialMatch = 0;
        for (let i = 0; i < this.secret.length; ++i) {
            let s = this.secret.charAt(i);
            for (let j = 0; j < guess.length; ++j) {
                let g = guess.charAt(j);
                if (s === g) {
                    if (i === j) ++perfectMatch;
                    else --partialMatch;
                }
            }
        }
        if (perfectMatch === partialMatch) return new Move(guess,"No Match!",false);
        let msg = "";
        if (perfectMatch > 0) msg += perfectMatch;
        if (partialMatch < 0) msg += partialMatch;
        return new Move(guess,msg,false,perfectMatch,partialMatch);
    }
};