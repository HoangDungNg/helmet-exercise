const express = require('express');
const app = express();
const helmet = require('helmet');

module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));

// helmet
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());

app.disable('strict-transport-security');
app.use('/_api', api);
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
