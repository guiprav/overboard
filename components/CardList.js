let Card = require('./Card');
let dom = require('dominant');

module.exports = state => {
  let refs = {};

  let cardList = dom.el('div', { class: 'cardList' }, [
    dom.el('div', { class: 'cardList-header' }, [
      refs.title = dom.el('div', { class: 'cardList-title' }),
    ]),

    refs.cardWrapper = dom.el('div', { class: 'cardList-cardWrapper' }),
  ]);

  Object.defineProperty(cardList, 'state', {
    get: () => dom.resolve(state),
  });

  dom.props(refs.title, () => ({ textContent: dom.resolve(state).title }));

  dom.array(refs.cardWrapper, {
    get: () => dom.resolve(state).cards,
    forEach: (wrapper, cardState) => wrapper.append(Card(cardState)),
  });

  return cardList;
};
