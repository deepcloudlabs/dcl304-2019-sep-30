class LotteryViewModel {
    constructor() {
        this.numbers = ko.observableArray([]);
        this.n = ko.observable(1);
        this.draw = this.draw.bind(this);
        this.reset = this.reset.bind(this);
    }

    draw() {
        for (let i=0;i<Number(this.n());++i){
            fetch(
               'http://localhost:7001/lottery?min=1&max=50&size=6'
            ).then( res => res.json())
             .then( nums => this.numbers.push(nums));
        }
    }

    reset() {
        this.numbers([]);
    }
}

let model = new LotteryViewModel();
$(document).ready(() => {
    ko.applyBindings(model);
});