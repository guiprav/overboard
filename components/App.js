let Board = require('./Board');
let PrototypeHubClient = require('prototype-hub/client');
let dom = require('dominant');

module.exports = () => {
  let hub = new PrototypeHubClient();

  hub.subscribe((err, state) => {
    if (err) {
      console.error(err);
      return;
    }

    dom.update();
  });

  let refs = {};

  let app = dom.el('div', { class: 'App' }, [
    refs.board = Board(() => hub.state.board),
  ]);

  app.state = { hub };

  return app;
};
