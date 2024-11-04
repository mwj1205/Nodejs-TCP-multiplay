import { createPingPacket } from '../../utils/notification/game.notification.js';

class User {
  constructor(id, socket) {
    this.id = id;
    this.socket = socket;
    this.x = 0;
    this.y = 0;
    this.lastX = 0; // 바로 직전의 위치
    this.lastY = 0;
    this.lastUpdateTime = Date.now();
    this.latency = 0;
    this.gameId = null; // 참가한 게임의 게임id
    this.playerId = 0;
    this.speed = 3;
  }

  // 핑 패킷 전송
  ping() {
    const now = Date.now();

    console.log(`[${this.id}] ping`);
    this.socket.write(createPingPacket(now));
  }

  // 클라이언트로 받은 핑 패킷을 보고 latency 계산
  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;
    console.log(`Received pong from user ${this.id} at ${now} with latency ${this.latency}ms`);
  }

  // latency에 따른 추측 항법
  calculatePosition(latency) {
    // 가만히 있으면 계산하지 않고 보냄
    if (this.x === this.lastX && this.y === this.lastY) {
      return {
        x: this.x,
        y: this.y,
      };
    }

    // 시간 차이 계산 (초 단위)
    const timeDiff = (Date.now() - this.lastUpdateTime + latency) / 1000;

    // 이동 거리 계산
    const distance = this.speed * timeDiff;

    // 이동 방향의 각도 계산 (라디안)
    const deltaX = this.x - this.lastX;
    const deltaY = this.y - this.lastY;
    const angle = Math.atan2(deltaY, deltaX);

    // 삼각함수를 사용하여 x, y 좌표 계산
    return {
      x: this.x + Math.cos(angle) * distance,
      y: this.y + Math.sin(angle) * distance,
    };
  }

  initPosition(x, y) {
    this.x = x;
    this.lastX = x;
    this.y = y;
    this.lastY = y;
  }

  updatePosition(x, y) {
    this.lastX = this.x;
    this.lastY = this.y;
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
