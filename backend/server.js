const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

const db = {
  appointments: [],
};

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app, db);
app.listen(port, () => {
  console.log('Listening for requests on: ' + port);
});
