import { getGameSession } from '../../session/game.session.js';
import { getUserById } from '../../session/user.session.js';
import CustomError from '../../utils/error/customError.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { handlerError } from '../../utils/error/errorHandlers.js';
import { createLocationPacket } from '../../utils/notification/game.notification.js';

const locationUpdateHandler = async ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    console.log('payload: ', payload);
    // userId로 유저 검색
    const user = getUserById(userId);
    if (!user) {
      throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
    }

    // user 인스턴스에 담긴 gameId로 게임 검색
    const gameId = user.gameId;
    const gameSession = getGameSession(gameId);
    if (!gameSession) {
      throw new CustomError(ErrorCodes.GAME_NOT_FOUND, `게임 세션을 찾을 수 없습니다: ${gameId}`);
    }

    // 유저의 위치 정보 업데이트
    user.updatePosition(x, y);
    // 같은 게임에 존재하는 모든 유저의 위치 정보 불러오기
    const locationData = gameSession.getOtherLocation(user.id);
    // 위치 정보를 담은 패킷 생성
    const locationPacket = createLocationPacket(locationData);

    socket.write(locationPacket);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default locationUpdateHandler;
