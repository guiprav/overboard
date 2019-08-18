let CardList = require('./components/CardList');

window.dom = require('dominant');

addEventListener('DOMContentLoaded', () => {
  document.body.append(window.toDoList = CardList({
    title: 'To-Do',

    cards: [
      { title: 'Stay home' },
      { title: 'Do the dishes' },
    ],
  }));

  document.body.append(window.doingList = CardList({
    title: 'Doing',

    cards: [
      { title: 'Procrastinate' },
    ],
  }));
});
