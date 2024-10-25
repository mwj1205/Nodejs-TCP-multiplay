import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

const MAX_PLAYERS = 30;

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.users = [];
  }

  // 게임에 접속한 유저 추가
  addUser(user) {
    if (this.users.length >= MAX_PLAYERS) {
      throw new CustomError(ErrorCodes.GAME_SESSION_FULL, '게임 세션 인원이 가득 찼습니다.');
    }

    this.users.push(user);
  }

  // 게임에 접속한 유저 검색
  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  // 유저 제거 (게임에서 나감)
  removeUser(userId) {
    this.users = this.users.filter((user) => user.id !== userId);
  }
}

export default Game;
