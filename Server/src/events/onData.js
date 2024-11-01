import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';
import { getHandlerById } from '../handler/index.js';
import { getProtoMessages } from '../init/loadProto.js';
import { getUserBySocket } from '../session/user.session.js';
import CustomError from '../utils/error/customError.js';
import { handlerError } from '../utils/error/errorHandlers.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
  // 기존 버퍼에 새로 수신된 데이터 추가
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  while (socket.buffer.length >= totalHeaderLength) {
    // 헤더의 맨 앞 4바이트 읽음
    const length = socket.buffer.readUInt32BE(0);
    // 4 바이트 뒤의 (TOTAL_LENGTH) 1바이트 만큼 읽음
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);

    // 전체 받아야 하는 길이만큼 왔으면
    if (socket.buffer.length >= length) {
      // 헤더 이후의 데이터 추출
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      // 자른 나머지 부분은 다시 버퍼에 저장
      socket.buffer = socket.buffer.subarray(length);

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            {
              const protoMessages = getProtoMessages();
              const Ping = protoMessages.common.Ping;
              const pingMessage = Ping.decode(packet);
              const user = getUserBySocket(socket);
              if (!user) {
                throw new CustomError(ErrorCodes.USER_NOT_FOUND, '유저를 찾을 수 없습니다.');
              }
              user.handlePong(pingMessage);
            }
            break;
          case PACKET_TYPE.NORMAL: {
            // 패킷 파서
            const { handlerId, userId, payload } = packetParser(packet);

            // handlerId에 맞는 핸들러 호출
            const handler = getHandlerById(handlerId);
            await handler({ socket, userId, payload });
          }
        }
      } catch (err) {
        handlerError(socket, err);
      }
    } else {
      break;
    }
  }
};
