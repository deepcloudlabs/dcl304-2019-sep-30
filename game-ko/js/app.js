import GameViewModel from "./game.js";

export const model = new GameViewModel();

$(document).ready(() => {
     ko.applyBindings(model);
});