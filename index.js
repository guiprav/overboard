let Board = require('./components/Board');

window.dom = require('dominant');
window.hub = require('./hub');

addEventListener('DOMContentLoaded', () => {
  window.boardState = {};

  hub.subscribe((err, state) => {
    if (err) {
      console.error(err);
      return;
    }

    boardState = state;
    dom.update();
  });

  document.body.append(window.board = Board(() => boardState));
});
