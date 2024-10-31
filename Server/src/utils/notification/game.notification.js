import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';

// 범용적으로 다른 notification에도 사용
const makeNotification = (message, type) => {
  // 헤더 생성
  const packetLength = Buffer.alloc(TOTAL_LENGTH);
  packetLength.writeUInt32BE(message.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0);

  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  packetType.writeUInt8(type, 0);

  return Buffer.concat([packetLength, packetType, message]);
};

// location packet 생성
export const createLocationPacket = (data) => {
  // 프로토 메세지 불러옴
  const protoMessage = getProtoMessages();
  const Location = protoMessage.gameNotification.LocationUpdate;

  // 전송할 location 정보 인코딩
  const payload = { users: data };
  const message = Location.create(payload);
  const locationPacket = Location.encode(message).finish();
  return makeNotification(locationPacket, PACKET_TYPE.LOCATION);
};

export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  // 전송할 Ping 패킷 인코딩
  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();
  return makeNotification(pingPacket, PACKET_TYPE.PING);
};
