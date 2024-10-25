import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByHandlerId } from '../../handler/index.js';
import { getProtoMessages } from '../../init/loadProto.js';

export const packetParser = (packet) => {
  const protoMessages = getProtoMessages();

  // common 패킷 디코딩
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (err) {
    console.error(e);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  // 클라이언트 버전 체크
  if (clientVersion !== CLIENT_VERSION) {
    throw Error();
  }

  // handler가 사용하는 protobuf 불러옴
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw Error();
  }

  // protoType에서 '.'을 기준으로 나눔
  const [namespace, typeName] = protoTypeName.split('.');
  const payloadType = protoMessages[namespace][typeName];
  let payload;

  // common 패킷의 payload부분 파싱
  try {
    payload = payloadType.decode(packet.payload);
  } catch (err) {
    console.error(err);
  }

  // payload에서 누락된 필드가 있는지 확인
  const expectedFields = Object.keys(payloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field));

  if (missingFields.length > 0) {
    throw Error();
  }

  return { handlerId, userId, payload };
};
