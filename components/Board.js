let CardDialog = require('./CardDialog');
let CardList = require('./CardList');
let dom = require('dominant');

module.exports = props => {
  let refs = {};

  let board = dom.el('div', { class: 'board' }, [
    refs.cardListPlaceholder = dom.comment(),
  ]);

  board.refs = refs;

  Object.defineProperty(board, 'props', {
    get: () => dom.resolve(props) || {},
  });

  board.state = {
    get remote() {
      return dom.resolve(board.props.remoteState) || {};
    },
  };

  board.openCardDialog = id => {
    if (!board.state.remote.cards[id]) {
      throw new Error(`Unknown card ID: ${id}`);
    }

    board.state.openCardId = id;
    dom.update();
  };

  board.closeCardDialog = () => {
    board.state.openCardId = null;
    dom.update();
  };

  dom.repeat(refs.cardListPlaceholder, {
    get: () => board.state.remote.lists,

    map: listState => CardList({
      parentBoard: board,
      remoteState: listState,
    }),
  });

  board.append(refs.cardDialog = CardDialog({
    parentBoard: board,
    openCardId: () => board.state.openCardId,
  }));

  return board;
};
