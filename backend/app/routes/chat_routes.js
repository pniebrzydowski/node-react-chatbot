module.exports = function(app, db) {
  app.post('/message', (req, res, next) => {
    console.log(req.body);
    const resObject = {
      messageText: 'Nice Message!',
    };
    res.send(resObject);
  });

  app.post('/appointment', (req, res, next) => {
    console.log(req.body);
    const resObject = {
      messageText: 'Thank you for setting an appointment!',
    };
    res.send(resObject);
  });

  app.get('/greeting', (req, res, next) => {
    const resObject = {
      messageText: 'When would you like to book an appointment?',
    };
    res.send(resObject);
  });
}
