const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
