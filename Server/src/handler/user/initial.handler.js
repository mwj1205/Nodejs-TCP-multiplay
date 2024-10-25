import { v4 as uuidv4 } from 'uuid';
import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { addGameSession, findAvailableGame } from '../../session/game.session.js';
import { addUser } from '../../session/user.session.js';
import { handlerError } from '../../utils/error/errorHandlers.js';
import { CreateResponse } from '../../utils/response/createResponse.js';
import { ErrorCodes } from '../../utils/error/errorCodes.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;
    console.log('payload: ', payload);

    // 접속한 유저 세션 추가
    const sessionUser = addUser(socket, userId);
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

    console.log(`enter game: ID ${gameSession.id}`);

    // response 생성, 전송
    const initialResponse = CreateResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId, gameId },
      deviceId,
    );

    socket.write(initialResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default initialHandler;
