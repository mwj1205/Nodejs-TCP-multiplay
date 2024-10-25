class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.latency = 0;
    this.gameId = null; // 참가한 게임의 게임id
    this.playerId = 0;
  }
}
