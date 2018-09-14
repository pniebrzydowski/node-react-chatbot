const moment = require('moment');

const messageService = require('../services/messages');
const validationService = require('../services/validation');
const dbService = require('../services/db');

module.exports = function(app, db) {
  app.post('/message', (req, res, next) => {
    res.json({status: 200});
  });

  app.post('/appointment', (req, res, next) => {
    const selectedDate = moment(req.body.selectedDate);
    let messagesToSend = [];

    if (!validationService(db).isSlotAvailable(selectedDate)) { // already occupied
      messagesToSend.push(messageService.getRandomMessage('unavailable'));
    }
    else if (validationService(db).isFinalSelection(selectedDate)) { // three selected
      messagesToSend.push(
        messageService.getRandomMessage('finalReply'),
        messageService.getDateText(db.appointments[0]),
        messageService.getDateText(db.appointments[1]),
        messageService.getDateText(selectedDate),
        messageService.getRandomMessage('thankYou'),
      );
    }
    else {
      messagesToSend.push(
        messageService.getRandomMessage('dateReply'),
        messageService.getDateText(selectedDate),
        messageService.getRandomMessage('greeting'),
      );
      dbService(db).addAppointment(selectedDate);
    }

    res.json({status: 200, messages: messagesToSend});
  });

  app.get('/greet', (req, res, next) => {
    dbService(db).clear();
    const messagesToSend = [
      messageService.getRandomMessage('greeting')
    ];
    res.json({status: 200, messages: messagesToSend});
  });
}
