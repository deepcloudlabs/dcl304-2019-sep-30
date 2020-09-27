export default class Move {
    constructor(guess, message, announcement = true, perfectMatch = 0, partialMatch = 0) {
        this.guess = guess;
        this.message = message;
        this.announcement = announcement;
        this.perfectMatch = perfectMatch;
        this.partialMatch = partialMatch;
    }
};

export const MAX_TRIES = 16;

export function fun(){}
function gun(){}