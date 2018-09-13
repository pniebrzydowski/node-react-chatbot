module.exports = function(app, db) {
  app.post('/message', (req, res) => {
    console.log(req.body);
    res.send('Nice message!');
  });

  app.post('/appointment', (req, res) => {
    console.log(req.body);
    res.send('Thank you for setting an appointment!');
  });

  app.get('/greeting', (req, res) => {
    res.send('When would you like to book an appointment?');
  });
}
