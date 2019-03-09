const GameManager = require('../managers/gameManager');
const action = require('../constants/actionTypes');

module.exports = {
  handleResponse: (req, res, next) => {
    const response = req.body;
    console.log('getting response in gameController, line 6', response);
    switch (response.action) {
      case 'GET_STATE': {
        //
        break;
      }
      case 'START': {
        // do start logic
        console.log('inside START case');
        const initConfig = response.payload;
        const currentGame = GameManager.createGame(initConfig);
        console.log(currentGame);
        res.json(currentGame.gameState);
        break;
      }
      case 'INCREMENT': {
        // do increment logic
        break;
      }
      case 'UNDO': {
        // do undo logic/
        break;
      }
      case 'RESTART': {
        // do restart logic
        break;
      }
    }
  }
};
