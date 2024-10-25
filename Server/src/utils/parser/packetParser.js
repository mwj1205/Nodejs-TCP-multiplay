import { CLIENT_VERSION } from '../../constants/env.js';
import { getProtoTypeNameByHandlerId } from '../../handler/index.js';
import { getProtoMessages } from '../../init/loadProto.js';
import CustomError from '../error/customError.js';
import { ErrorCodes } from '../error/errorCodes.js';

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
    throw new CustomError(
      ErrorCodes.CLIENT_VERSION_MISMATCH,
      '클라이언트 버전이 일치하지 않습니다.',
    );
  }

  // handler가 사용하는 protobuf 불러옴
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, `알 수 없는 핸들러 Id: ${handlerId}`);
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
    throw new CustomError(
      ErrorCodes.MISSING_FIELDS,
      `필수 필드가 누락되었습니다: ${missingFields.join(', ')}`,
    );
  }

  return { handlerId, userId, payload };
};
