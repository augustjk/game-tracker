const GameManager = require('../managers/gameManager');
const PlayerQueue = require('../managers/queueManager');
const action = require('../constants/actionTypes');
const { defaultGameState } = require('../constants/defaults');
const socketCollection = require('../socketCollection');

module.exports = {
  handleResponse: (req, res, next) => {
    const response = req.body;
    switch (response.action) {
      case action.GET_STATE: {
        const currentGame = GameManager.getGame();
        if (currentGame) {
          socketCollection.forEach((ws)=>{
            if (ws.readyState === 1) {
              ws.send(JSON.stringify(currentGame.gameState));
            }
          });
          res.json(currentGame.gameState);
        } else {
          socketCollection.forEach((ws)=>{
            if (ws.readyState === 1) {
              ws.send(JSON.stringify(defaultGameState));
            }
          });
          res.json(defaultGameState);
        }
        break;
      }
      case action.START: {
        const initConfig = response.payload;
        const currentGame = GameManager.createGame(initConfig);
        socketCollection.forEach((ws)=>{
          if (ws.readyState === 1) {
            ws.send(JSON.stringify(currentGame.gameState));
          }
        });
        res.json(currentGame.gameState);
        break;
      }
      case action.INCREMENT: {
        const currentGameState = GameManager.getGame().incrementScore(
          response.payload
        );
        socketCollection.forEach((ws)=>{
          if (ws.readyState === 1) {
            ws.send(JSON.stringify(currentGameState));
          }
        });
        socketCollection.forEach((ws)=>{
          if (ws.readyState === 1) {
            ws.send(JSON.stringify(currentGameState));
          }
        });
        res.json(currentGameState);
        break;
      }
      case action.UNDO: {
        const currentGameState = GameManager.getGame().undo(response.payload);
        socketCollection.forEach((ws)=>{
          if (ws.readyState === 1) {
            ws.send(JSON.stringify(currentGameState));
          }
        });
        res.json(currentGameState);
        break;
      }
      case action.RESTART: {
        const restartType = response.payload;
        if (restartType === 0) {
          // if both leave
          // GameManager.endGame();
          const newState = {
            ...defaultGameState,
            p1name: PlayerQueue.dequeue() || '',
            p2name: PlayerQueue.dequeue() || ''
          };
          GameManager.getGame().setNewGameState(newState);
          socketCollection.forEach((ws)=>{
            if (ws.readyState === 1) {
              ws.send(JSON.stringify(newState));
            }
          });
          res.json(newState);
        } else if (restartType === 1) {
          // winner stay
          const winner = GameManager.getGame().getWinner();
          const newState = {
            ...defaultGameState,
            p1name: winner,
            p2name: PlayerQueue.dequeue() || ''
          };
          GameManager.getGame().setNewGameState(newState);
          socketCollection.forEach((ws)=>{
            if (ws.readyState === 1) {
              ws.send(JSON.stringify(newState));
            }
          });
          res.json(newState);
        } else {
          // rematch
          const restartedGameState = GameManager.getGame().restart();
          socketCollection.forEach((ws)=>{
            if (ws.readyState === 1) {
              ws.send(JSON.stringify(restartedGameState));
            }
          });
          res.json(restartedGameState);
        }
        break;
      }
      case action.ENQUEUE: {
        const newQueue = PlayerQueue.enqueue(response.payload);
        socketCollection.forEach((ws)=>{
          if (ws.readyState === 1) {
            ws.send(JSON.stringify({
              sidebar: true,
              queue: newQueue
            }));
          }
        });
        res.json(newQueue);
        break;
      }
      default: {
        res.status(401).send('bad action body');
      }
    }
  }
};
