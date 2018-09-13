const chatRoutes = require('./chat_routes');

module.exports = function(app, db) {
  chatRoutes(app, db);
}
