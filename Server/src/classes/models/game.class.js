import { GAME_MAX_PLAYER } from '../../constants/env.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

class Game {
  constructor(id) {
    this.id = id;
    this.users = [];
  }

  // 게임에 접속한 유저 추가
  addUser(user) {
    if (this.users.length >= GAME_MAX_PLAYER) {
      throw new CustomError(ErrorCodes.GAME_SESSION_FULL, '게임 세션 인원이 가득 찼습니다.');
    }

    this.users.push(user);
    user.setGameId(this.id);
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
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        const { x, y } = user.getPosition();
        return { id: user.id, playerId: user.playerId, x, y };
      });
    return locationData;
  }
}

export default Game;
