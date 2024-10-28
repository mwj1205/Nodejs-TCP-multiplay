import { v4 as uuidv4 } from 'uuid';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { addGameSession, findAvailableGame } from '../../session/game.session.js';
import { addUser, getAllUsersId } from '../../session/user.session.js';
import { handlerError } from '../../utils/error/errorHandlers.js';
import { CreateResponse } from '../../utils/response/createResponse.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';
import { createUser, findUserByDeviceId, updateUserLogin } from '../../db/user/user.db.js';
import { getUserCoordinate } from '../../db/game/game.db.js';
import CustomError from '../../utils/error/customError.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;
    console.log('payload: ', payload);

    // 유저 db 처리
    let user = await findUserByDeviceId(deviceId);
    if (!user) {
      user = await createUser(deviceId);
    } else {
      await updateUserLogin(user.id);
    }

    // 접속한 유저 세션 추가
    const sessionUser = addUser(socket, user.deviceId);
    sessionUser.setLatency(latency);
    sessionUser.setPlayerId(playerId);

    // 참가 가능한 게임 검색
    let gameSession = findAvailableGame();
    // 참가 가능한 게임이 없다면 생성
    if (!gameSession) {
      const gameId = uuidv4();
      gameSession = addGameSession(gameId);
    }

    try {
      // 게임 세션에 유저 추가
      gameSession.addUser(sessionUser);
    } catch (err) {
      if (err.code === ErrorCodes.GAME_SESSION_FULL) {
        const gameId = uuidv4();
        gameSession = addGameSession(gameId);
        gameSession.addUser(sessionUser);
      }
    }

    let userPosition;
    try {
      userPosition = await getUserCoordinate(deviceId);
      if (!userPosition) {
        userPosition = { x: 0, y: 0 };
      }
    } catch (err) {
      throw new CustomError(
        ErrorCodes.DATABASE_ERROR,
        `데이터베이스 오류가 발생했습니다. ${err.message}`,
      );
    }
    console.log('userPosition: ', userPosition);

    console.log(`enter game: ID ${gameSession.id}`);
    console.log(`Users: ${getAllUsersId()}`);

    // response 생성, 전송
    const initialResponse = CreateResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
      userId: user.deviceId,
      gameId: gameSession.id,
      x: userPosition.x,
      y: userPosition.y,
    });

    socket.write(initialResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default initialHandler;
