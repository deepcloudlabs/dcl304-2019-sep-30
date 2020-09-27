import React from 'react';
import './App.css';

class Move {
    constructor(guess, message, announcement = true, perfectMatch = 0, partialMatch = 0) {
        this.guess = guess;
        this.message = message;
        this.announcement = announcement;
        this.perfectMatch = perfectMatch;
        this.partialMatch = partialMatch;
    }
};

export default class Mastermind extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            tries: 0,
            secret: 123,
            guess: "123",
            history: []
        }
    }

    componentDidMount() {
        this.setState({secret: this.createSecret()});
    }

    initGame = () => {
        let tries = 0;
        let history = [];
        let secret = this.createSecret();
        this.setState({tries, history, secret})
    }

    play = () => {
        if (this.state.secret === this.state.guess) {
            this.initGame();
            let history = [];
            history.push(new Move(this.state.guess, "You win!"));
            this.setState({history});
        } else {
            let history = Array.from(this.state.history);
            let tries = this.state.tries + 1;
            history.push(this.createMove());
            this.setState({history, tries});
        }
    }

    createMove = () => {
        let perfectMatch = 0, partialMatch = 0;
        for (let i = 0; i < this.state.secret.length; ++i) {
            let s = this.state.secret.charAt(i);
            for (let j = 0; j < this.state.guess.length; ++j) {
                let g = this.state.guess.charAt(j);
                if (s === g) {
                    if (i === j) ++perfectMatch;
                    else --partialMatch;
                }
            }
        }
        if (perfectMatch === partialMatch) return new Move(this.state.guess, "No Match!", false);
        let msg = "";
        if (perfectMatch > 0) msg += perfectMatch;
        if (partialMatch < 0) msg += partialMatch;
        return new Move(this.state.guess, msg, false, perfectMatch, partialMatch);
    }

    createSecret = () => {
        let number = [];
        number.push(this.createDigit(1, 9));
        while (number.length !== 3) {
            let num = this.createDigit(0, 9);
            if (!number.includes(num))
                number.push(num);
        }
        return number.reduce((n, d) => n + d, '');
    }

    createDigit = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1))
            + min;
    }

    handleGuessInput = (event) => {
        this.setState({guess: event.target.value});
    }

    render() {
        return (
            <div className="container" role="main">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title">Game Panel ({this.state.secret})</h3>
                    </div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label htmlFor="tries">Tries</label>
                            <span id="tries"
                                  className="badge">{this.state.tries}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="guess">Guess</label>
                            <input type="number"
                                   value={this.state.guess}
                                   onChange={this.handleGuessInput}
                                   id="guess"
                                   min="100"
                                   max="999"
                                   className="form-control"/>
                        </div>
                        <div className="form-group">
                            <button id="play"
                                    onClick={this.play}
                                    className="btn btn-success">Play
                            </button>
                        </div>
                    </div>
                </div>
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title">Moves</h3>
                    </div>
                    <div className="panel-body">
                        <table className="table table-striped table-responsive table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>Guess</th>
                                <th>Message</th>
                            </tr>
                            </thead>
                            <tbody id="history">{
                                this.state.history.map( (move,i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{move.guess}</td>
                                            <td>{move.message}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};
