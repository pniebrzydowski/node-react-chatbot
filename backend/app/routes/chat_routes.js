const moment = require('moment');

const messageService = require('../services/messages');

module.exports = function(app, db) {
  app.post('/message', (req, res, next) => {
    res.json({status: 200});
  });

  app.post('/appointment', (req, res, next) => {
    const selectedDate = moment(req.body.selectedDate);
    const messagesToSend = [
      messageService.getDateReply(selectedDate),
      messageService.getGreeting(),
    ];
    res.json({status: 200, messages: messagesToSend});
  });

  app.get('/greeting', (req, res, next) => {
    const messagesToSend = [
      messageService.getGreeting()
    ];
    res.json({status: 200, messages: messagesToSend});
  });
}
