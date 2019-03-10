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
      serving: [initialConfig.serving],
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
    if (this.gameState.gameState == 2) {
      return this.gameState;
    }
    const player = payload.player;
    const p1Score = this.gameState.p1Score;
    const p2Score = this.gameState.p2Score;
    const len = p1Score.length;

    if (player === 1) {
      p1Score.push(p1Score[len - 1] + 1);
      p2Score.push(p2Score[len - 1]);
    } else if (player === 2) {
      p1Score.push(p1Score[len - 1]);
      p2Score.push(p2Score[len - 1] + 1);
    }

    this.didPlayerWin();
    this.determineServer();
    // need to determine if there is a winner after the increment. if there is, game state needs to change
    return this.gameState;
  }

  determineServer() {
    const len = this.gameState.serving.length;
    const currServer = this.gameState.serving[len - 1];
    const serveInterval = this.gameState.maxScore === 21 ? 5 : 2;
    if (len % serveInterval === 0) {
      currServer === 1
        ? this.gameState.serving.push(2)
        : this.gameState.serving.push(1);
    } else {
      this.gameState.serving.push(this.gameState.serving[len - 1]);
    }
  }

  didPlayerWin() {
    const p1Score = this.gameState.p1Score[this.gameState.p1Score.length - 1];
    const p2Score = this.gameState.p2Score[this.gameState.p2Score.length - 1];
    const maxScore = this.gameState.maxScore;
    if (
      (p1Score >= maxScore || p2Score >= maxScore) &&
      Math.abs(p1Score - p2Score) >= 2
    ) {
      this.gameState.gameState = 2;
      return true;
    }
    return false;
  }

  undo() {
    const p1Score = this.gameState.p1Score;
    const p2Score = this.gameState.p2Score;
    const serving = this.gameState.serving;
    p1Score.pop();
    p2Score.pop();
    serving.pop();
    return this.gameState;
  }

  restart() {
    this.gameState = { ...this.initialState };
    this.gameState.p1Score = [0];
    this.gameState.p2Score = [0];
    return this.gameState;
  }

  setNewGameState(newState) {
    this.gameState = {...newState}
  }
}

module.exports = new GameManager();
