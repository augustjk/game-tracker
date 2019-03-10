const GameManager = require('../managers/gameManager');
const PlayerQueue = require('../managers/queueManager');
const action = require('../constants/actionTypes');
const { defaultGameState } = require('../constants/defaults');

module.exports = {
  handleResponse: (req, res, next) => {
    const response = req.body;
    switch (response.action) {
      case action.GET_STATE: {
        const currentGame = GameManager.getGame();
        if (currentGame) {
          res.json(currentGame.gameState);
        } else {
          res.json(defaultGameState);
        }
        break;
      }
      case action.START: {
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
          // if both leave
          GameManager.endGame();
          res.json({
            ...defaultGameState,
            p1Name: PlayerQueue.dequeue() || '',
            p2Name: PlayerQueue.dequeue() || ''
          });
        } else if (restartType === 1) {
          const winner = GameManager.getGame().getWinner();

          let winnerState = {
            ...defaultGameState,
            p1name: winner,
            p2name: PlayerQueue.dequeue() || ''
          };
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
        res.json(PlayerQueue.enqueue(response.payload));
        break;
      }
      default: {
        res.status(401).send('bad action body');
      }
    }
  }
};
