import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
  // 기존 버퍼에 새로 수신된 데이터 추가
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH;

  while (data.length > totalHeaderLength) {
    // 헤더의 맨 앞 4바이트 읽음
    const length = socket.buffer.readUInt32BE(0);
    // 4 바이트 뒤의 (TOTAL_LENGTH) 1바이트 만큼 읽음
    const packetType = socket.buffer.readUInt8BE(TOTAL_LENGTH);

    // 전체 받아야 하는 길이만큼 왔으면
    if (socket.buffer.length >= length) {
      // 헤더 이후의 데이터 추출
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      // 자른 나머지 부분은 다시 버퍼에 저장
      socket.buffer = socket.buffer.subarray(length);

      try {
        switch (packetType) {
          case PACKET_TYPE.NORMAL: {
            // 패킷 파서
            const { handlerId, userId, payload } = packetParser(packet);
          }
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      break;
    }
  }
};
