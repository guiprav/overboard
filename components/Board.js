let CardList = require('./CardList');
let dom = require('dominant');

module.exports = state => {
  let refs = {};

  let board = dom.el('div', { class: 'board' }, [
    refs.cardListPlaceholder = dom.comment(),
  ]);

  Object.defineProperty(board, 'state', {
    get: () => dom.resolve(state) || {},
  });

  dom.repeat(refs.cardListPlaceholder, {
    get: () => board.state.lists || [],
    map: listState => CardList(listState),
  });

  return board;
};
