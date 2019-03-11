const express = require('express');
const path = require('path');
const app = express();
const expressWs = require('express-ws')(app);
const bodyParser = require('body-parser');
const socketCollection = require('./socketCollection');

const PORT = 3000;

expressWs.getWss().on('connection', function(ws) {
  console.log('connection open');
  socketCollection.push(ws);
});

// import controllers
const sidebarController = require('./controllers/sidebarController');
const gameController = require('./controllers/gameController');

app.use('/build', express.static(path.resolve(__dirname, '../build')));

// apply middleware here
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/sidebar', sidebarController.getData);

app.post('/action', gameController.handleResponse);

app.ws('/ws', (ws, req) => {
  // ws.send('hello from server');
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


module.exports = expressWs;