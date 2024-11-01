import { GAME_FIRST_SESSION_ID, GAME_MAX_PLAYER } from '../../constants/env.js';
import { removeGameSession } from '../../session/game.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import LatencyManager from '../managers/latency.manager.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
    this.latencyManager = new LatencyManager();
  }

  // 게임에 접속한 유저 추가
  addUser(user) {
    if (this.users.length >= GAME_MAX_PLAYER) {
      throw new CustomError(ErrorCodes.GAME_SESSION_FULL, '게임 세션 인원이 가득 찼습니다.');
    }

    this.users.push(user);
    user.setGameId(this.id);
    // 1초마다 user의 ping 메서드 호출
    this.latencyManager.addUser(user.id, user.ping.bind(user), 1000);
  }

  // 게임에 접속한 유저 검색
  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  // 유저 제거 (게임에서 나감)
  removeUser(userId) {
    const user = this.getUser(userId);
    user.leaveGame();
    this.users = this.users.filter((user) => user.id !== userId);
    // 핑 interval 제거
    this.latencyManager.removeUser(userId);
    // 유저 제거 후 게임에 남은 유저가 없다면 게임 세션 삭제
    if (this.users.length <= 0 && this.id !== GAME_FIRST_SESSION_ID) {
      this.latencyManager.clearAll();
      removeGameSession(this.id);
    }
  }

  // 게임 내의 모든 유저의 위치 정보
  getAllLocation() {
    const locationData = this.users.map((user) => {
      const { x, y } = user.getPosition();
      return { id: user.id, playerId: user.playerId, x, y };
    });
    return locationData;
  }

  // 본인을 제외한 게임 내의 모든 유저의 위치 정보
  getOtherLocation(userId) {
    const maxLatency = this.getMaxLatency();

    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        const { x, y } = user.calculatePosition(maxLatency);
        return { id: user.id, playerId: user.playerId, x, y };
      });
    return locationData;
  }

  // 게임의 유저 중 최대 latency 찾기
  getMaxLatency() {
    let maxLatency = 0;
    this.users.forEach((user) => {
      maxLatency = Math.max(maxLatency, user.latency);
    });
    return maxLatency;
  }
}

export default Game;
