let model = new GameViewModel();

$(document).ready(() => {
    function createMessageBadge(move) {
        if (move.announcement) {
            return "<span class='label label-info'>" + move.message + "</span>";
        } else {
            let label = "";
            if (move.partialMatch !== 0) {
                label += "<span class='label label-danger'>" + move.partialMatch + "</span>";
            }
            if (move.perfectMatch !== 0) {
                label += "<span class='label label-success'>" + move.perfectMatch + "</span>";
            }
            if (move.perfectMatch === move.partialMatch) {
                label = "<span class='label label-warning'>" + move.message + "</span>";
            }
            return label;
        }
    }

    function updateHistory() {
        history.empty();
        for (let i=0;i<model.history.length;++i){
            let move = model.history[i];
            // . . .
        }
        for (let i in model.history){
            let move = model.history[i];
            // . . .
        }
        for (let move of model.history) {
            history.append("<tr>"
                + "<td>" + move.guess + "</td>"
                + "<td>" + createMessageBadge(move) + "</td>"
                + "</tr>");
        }
    }

    function updateTries() {
        guessInputText.text(model.tries);
    }

    function updateProgressBar() {
        pbCounter.attr("aria-valuenow", model.counter);
        pbCounter.attr("style", "width: " + (10 * model.counter) / 6 + "%;");
        let clazz = "progress-bar progress-bar-success";
        if (model.counter < 20) {
            clazz = "progress-bar progress-bar-danger";
        } else if (model.counter < 40) {
            clazz = "progress-bar progress-bar-warning";
        }
        pbCounter.attr("class", clazz);
    }

    let playButton = $("#play");
    let guessInputText = $("#guess");
    let history = $("#history");
    let tries = $("#tries");
    let pbCounter = $("#counter");
    window.setInterval(() => {
        model.countDown();
        updateHistory();
        updateTries();
        updateProgressBar();
    }, 1000);

    playButton.click(() => {
        model.play(guessInputText.val().trim());
        updateHistory();
        updateTries();
        updateProgressBar();
    })
});