let Card = require('./Card');
let CardDialog = require('./CardDialog');
let dom = require('dominant');
let nanoid = require('nanoid');

module.exports = props => {
  let refs = {};

  let list = dom.el('div', { class: 'cardList' }, [
    dom.el('div', { class: 'cardList-listHeader' }, [
      refs.title = dom.el('div', { class: 'cardList-listTitle' }),
    ]),

    dom.el('div', { class: 'cardList-cardsWrapper' }, [
      refs.cardPlaceholder = dom.comment(),
    ]),

    refs.addCardBtn = dom.el('button', { class: 'cardList-addCardBtn' }, [
      dom.el('i', { class: 'fas fa-plus' }),
      dom.el('span', 'Add another card'),
    ]),
  ]);

  Object.defineProperty(list, 'props', {
    get: () => dom.resolve(props) || {},
  });

  list.state = {
    get parentBoard() {
      return dom.resolve(list.props.parentBoard) || {};
    },

    get remote() {
      return dom.resolve(list.props.remoteState) || {};
    },
  };

  list.addCard = cardState => hub.patch(draft => {
    let newCardId = nanoid();

    draft.board.cards[newCardId] = cardState;

    let listState = draft.board.lists.find(
      x => x.title === list.state.remote.title,
    );

    listState.cardIds.push(newCardId);
  });

  dom.props(refs.title, () => ({ textContent: list.state.remote.title }));

  dom.repeat(refs.cardPlaceholder, {
    get: () => list.state.remote.cardIds,

    map: cardId => Card({
      parentBoard: () => list.state.parentBoard,
      parentList: list,
      cardId,
    }),
  });

  refs.addCardBtn.addEventListener('click', () => {
    list.addCard({
      title: `Random card #${(Math.random() * 100000).toFixed()}`,
    });
  });

  return list;
};
