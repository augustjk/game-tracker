const gameActions = require('../controllers/gameController');
const GameManager = require('../managers/gameManager');

describe('server game controller test', () => {
  const initialConfig = {
    p1name: 'player 1',
    p2name: 'player 2',
    serving: 1,
    maxScore: 21
  };

  it(`should start a game`, () => {
    const currentGame = GameManager.createGame(initialConfig);
    expect(currentGame).not.toEqual(undefined);
    expect(currentGame.gameState).toEqual({
      ...initialState,
      gameState: 1,
      serving: [1]
    });
  });
});
