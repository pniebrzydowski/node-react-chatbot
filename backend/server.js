const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.listen(port, () => {
  console.log('Listening for requests on: ' + port);
});