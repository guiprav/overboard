let App = require('./components/App');
window.dom = require('dominant');

addEventListener('DOMContentLoaded', () => {
  window.app = App();
  window.hub = app.state.hub;

  document.body.append(app);
});
