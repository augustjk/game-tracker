const GameManager = require('../managers/gameManager');
const action = require('../constants/actionTypes');
const { defaultGameState } = require('../constants/defaults');

module.exports = {
  handleResponse: (req, res, next) => {
    const response = req.body;
    switch (response.action) {
      case action.GET_STATE: {
        //
        break;
      }
<<<<<<< HEAD
      case 'START': {
        // do start logic
        console.log('inside START case');
=======
      case action.START: {
>>>>>>> 55200701b418ca731e006bc0ce29e376174f0017
        const initConfig = response.payload;
        const currentGame = GameManager.createGame(initConfig);
        res.json(currentGame.gameState);
        break;
      }
      case action.INCREMENT: {
        const currentGameState = GameManager.getGame().incrementScore(
          response.payload
        );
        res.json(currentGameState);
        break;
      }
      case action.UNDO: {
        const currentGameState = GameManager.getGame().undo(response.payload);
        res.json(currentGameState);
        break;
      }
      case action.RESTART: {
        const restartType = response.payload;

        if (restartType === 0) {
          GameManager.endGame();
          res.json(defaultGameState);
        } else if (restartType === 1) {
          const winner = GameManager.getGame().getWinner();
          let winnerState = { ...defaultGameState, p1name: winner };
          // winnerState.p1name = winner;
          res.json(winnerState);
        } else {
          const restartedGameState = GameManager.getGame().restart();
          res.json(restartedGameState);
          // res.json(GameManager.getGame().gameState);
        }
        break;
      }
      case action.ENQUEUE: {
        //
      }
      default: {
        res.status(401).send('bad action body');
      }
    }
  }
};
