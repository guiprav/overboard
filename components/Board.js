let CardList = require('./CardList');
let dom = require('dominant');

module.exports = state => {
  let refs = {};

  let board = dom.el('div', { class: 'board' }, [
    refs.cardListWrapper = dom.el('div', { class: 'board-cardListWrapper' }),
  ]);

  dom.array(refs.cardListWrapper, {
    get: () => dom.resolve(state).lists || [],
    forEach: (list, listState) => list.append(CardList(listState)),
  });

  return board;
};
