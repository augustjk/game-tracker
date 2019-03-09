class GameManager {
  constructor() {
    this.activeGame = undefined;
  }

  createGame(initialConfig) {
    this.activeGame = new GameSession(initialConfig);
    return this.activeGame;
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
      gameState: 1,
      p1Score: [0],
      p2Score: [0],
      serving: initialConfig.serving,
      maxScore: initialConfig.maxScore,
      endGameChoice: undefined
    };

    this.defaultState = {
      ...this.gameState
    };
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

  restart(payload) {
    const choice = payload;
    if (payload === 0) {
      // if choice = 0, then both players leave
    } else if (payload === 1) {
      // if choice is 1, the winner stays
      // this.
    } else {
      // if choice is 2, then it's a rematch
      this.gameState = { ...this.defaultState };
    }
  }
}

module.exports = new GameManager();
