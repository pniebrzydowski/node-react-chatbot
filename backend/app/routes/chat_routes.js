const moment = require('moment');

module.exports = function(app, db) {
  app.post('/message', (req, res, next) => {
    console.log(req.body);
    /* const resObject = {
      messageText: 'Nice Message!',
    }; */
    res.sendStatus(200);
  });

  app.post('/appointment', (req, res, next) => {
    const selectedDate = moment(req.body.selectedDate);
    const resObject = {
      messageText: 
        'I have made an appointment for ' +
        selectedDate.format('LL') + ' at ' + selectedDate.format('LT'),
    };
    res.send(resObject);
  });

  app.get('/greeting', (req, res, next) => {
    const resObject = {
      messageText: 'When would you like to book an appointment?',
      showDatepicker: true,
    };
    res.send(resObject);
  });
}
