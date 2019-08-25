let dom = require('dominant');

module.exports = props => {
  let refs = {};

  let dialog = dom.el('dialog', { class: 'cardDialog' }, [
    dom.el('div', { class: 'cardDialog-header' }, [
      refs.title = dom.el('span'),

      refs.closeBtn = dom.el('button', { class: 'cardDialog-closeBtn' }, [
        dom.el('i', { class: 'fas fa-times' }),
      ]),
    ]),
  ]);

  Object.defineProperty(dialog, 'props', {
    get: () => dom.resolve(props) || {},
  });

  dialog.state = {
    get parentBoard() {
      return dom.resolve(dialog.props.parentBoard);
    },

    get openCardId() {
      return dom.resolve(dialog.props.openCardId);
    },

    get openCardState() {
      let boardState = dialog.state.parentBoard.state;
      let { openCardId } = dialog.state;

      if (!boardState.remote.cards || !openCardId) {
        return {};
      }

      return dialog.state.parentBoard.state.remote.cards[openCardId];
    },
  };

  dom.props(dialog, () => ({ open: dialog.state.openCardId }));

  dom.props(refs.title, () => ({
    textContent: dialog.state.openCardState.title,
  }));

  refs.closeBtn.addEventListener('click', () => {
    dialog.state.parentBoard.closeCardDialog();
  });

  return dialog;
};
