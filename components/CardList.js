let Card = require('./Card');
let dom = require('dominant');

module.exports = state => {
  let refs = {};

  let cardList = dom.el('div', { class: 'cardList' }, [
    dom.el('div', { class: 'cardList-listHeader' }, [
      refs.title = dom.el('div', { class: 'cardList-listTitle' }),
    ]),

    dom.el('div', { class: 'cardList-cardsWrapper' }, [
      refs.cardPlaceholder = dom.comment(),
    ]),
  ]);

  Object.defineProperty(cardList, 'state', {
    get: () => dom.resolve(state) || {},
  });

  dom.props(refs.title, () => ({ textContent: cardList.state.title }));

  dom.repeat(refs.cardPlaceholder, {
    get: () => cardList.state.cards,
    map: cardState => Card(cardState),
  });

  return cardList;
};
