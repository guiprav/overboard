let dom = require('dominant');

module.exports = props => {
  let refs = {};

  let card = dom.el('button', { class: 'card' }, [
    refs.title = dom.el('div', { class: 'card-title' }),
  ]);

  Object.defineProperty(card, 'props', {
    get: () => dom.resolve(props) || {},
  });

  card.state = {
    get parentBoard() {
      return dom.resolve(card.props.parentBoard);
    },

    get remote() {
      return card.state.parentBoard.state.remote.cards[card.props.cardId];
    },
  };

  dom.props(refs.title, () => ({ textContent: card.state.remote.title }));

  card.addEventListener('click', () => {
    card.state.parentBoard.openCardDialog(card.props.cardId);
  });

  return card;
};
