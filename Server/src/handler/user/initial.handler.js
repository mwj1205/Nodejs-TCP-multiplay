import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { addUser } from '../../session/user.session.js';
import { handlerError } from '../../utils/error/errorHandlers.js';
import { CreateResponse } from '../../utils/response/createResponse.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;
    console.log('payload: ', payload);

    // 접속한 유저 세션 추가
    const sessionUser = addUser(socket, userId);
    sessionUser.setLatency(latency);
    sessionUser.setPlayerId(playerId);

    // response 생성, 전송
    const initialResponse = CreateResponse(
      HANDLER_IDS.INITIAL,
      RESPONSE_SUCCESS_CODE,
      { userId },
      deviceId,
    );

    socket.write(initialResponse);
  } catch (err) {
    handlerError(socket, err);
  }
};

export default initialHandler;
