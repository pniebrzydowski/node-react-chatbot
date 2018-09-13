const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

const db = {
  appointments: [],
};

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./app/routes')(app, db);
app.listen(port, () => {
  console.log('Listening for requests on: ' + port);
});
