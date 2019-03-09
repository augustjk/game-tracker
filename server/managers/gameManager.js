class GameManager {
  constructor() {
    this.activeGame = undefined;
  }

  createGame(initialConfig) {
    this.activeGame = new GameSession(initialConfig);
    return this.activeGame;
  }

  endGame() {
    this.activeGame = undefined;
  }

  getGame() {
    return this.activeGame;
  }
}

class GameSession {
  constructor(initialConfig) {
    this.gameState = {
      p1name: initialConfig.p1name,
      p2name: initialConfig.p2name,
      gameState: 1, // 0: no game. 1: in progress. 2: game end
      p1Score: [0],
      p2Score: [0],
      serving: initialConfig.serving,
      maxScore: initialConfig.maxScore,
      endGameChoice: undefined
    };

    this.initialState = {
      ...this.gameState
    };
  }

  getWinner() {
    const gameState = this.gameState;
    const p1Score = this.gameState.p1Score;
    const p2Score = this.gameState.p2Score;
    return gameState.p1Score[p1Score.length - 1] >
      gameState.p2Score[p2Score.length - 1]
      ? gameState.p1name
      : gameState.p2name;
  }

  incrementScore(payload) {
    const player = payload.player;
    const p1Score = this.gameState.p1Score;
    const p2Score = this.gameState.p2Score;
    const len = p1Score.length;

    if (player === 1) {
      p1Score.push(p1Score[len - 1] + 1);
      p2Score.push(p2Score[len - 1]);
    } else {
      p1Score.push(p1Score[len - 1]);
      p2Score.push(p2Score[len - 1] + 1);
    }
    // need to determine if there is a winner after the increment. if there is, game state needs to change
    return this.gameState;
  }

  undo(payload) {
    const player = payload.player;
    const p1Score = this.gameState.p1Score;
    const p2Score = this.gameState.p2Score;
    const len = p1Score.length;

    if (player === 1) {
      p1Score.pop();
      p2Score.pop();
    } else {
      p1Score.pop();
      p2Score.pop();
    }
    return this.gameState;
  }

  restart() {
    this.gameState = { ...this.initialState };
    this.gameState.p1Score = [0];
    this.gameState.p2Score = [0];
    return this.gameState;
  }
}

module.exports = new GameManager();