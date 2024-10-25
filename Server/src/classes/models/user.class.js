class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.lastUpdateTime = Date.now();
    this.latency = 0;
    this.gameId = null; // 참가한 게임의 게임id
    this.playerId = 0;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  setPlayerId(playerId) {
    if (playerId > 4 || playerId < 0) {
      this.playerId = 0;
    } else {
      this.playerId = playerId;
    }
  }

  setLatency(latency) {
    this.latency = latency < 0 ? 0 : latency;
  }

  setGameId(id) {
    this.gameId = id;
  }

  leaveGame() {
    this.gameId = null;
  }
}

export default User;
