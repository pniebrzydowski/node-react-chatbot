module.exports = function(app, db) {
  app.post('/message', (req, res) => {
    console.log(req.body);
    res.send(req.body.text);
  });
}
