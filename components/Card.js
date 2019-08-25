let dom = require('dominant');

module.exports = state => {
  let refs = {};

  let card = dom.el('div', { class: 'card' }, [
    refs.title = dom.el('div', { class: 'card-title' }),
  ]);

  Object.defineProperty(card, 'state', {
    get: () => dom.resolve(state) || {},
  });

  dom.props(refs.title, () => ({ textContent: card.state.title }));

  return card;
};
