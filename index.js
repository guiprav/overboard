let App = require('./components/App');

addEventListener('DOMContentLoaded', () => {
  window.app = App();
  window.hub = app.state.hub;

  document.body.append(app);
});
