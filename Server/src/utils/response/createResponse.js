import { PACKET_TYPE, PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../../constants/header.js';
import { getProtoMessages } from '../../init/loadProto.js';

// response 생성
export const CreateResponse = (handlerId, responseCode, data = null, userId) => {
  // proto type 가져오기
  const protoMessages = getProtoMessages();
  const Response = protoMessages.response.Response;

  // payload 생성
  const responsePayload = {
    handlerId,
    responseCode,
    timestamp: Date.now(),
    data: data ? Buffer.from(JSON.stringify(data)) : null,
  };

  // payload를 encode
  const buffer = Response.encode(responsePayload).finish();

  // 헤더 생성
  const packetLength = Buffer.alloc(TOTAL_LENGTH);
  packetLength.writeUInt32BE(buffer.length + TOTAL_LENGTH + PACKET_TYPE_LENGTH, 0);

  const packetType = Buffer.alloc(PACKET_TYPE_LENGTH);
  packetType.writeUInt8(PACKET_TYPE.NORMAL, 0);

  // 헤더 + payload 합쳐서 리턴
  return Buffer.concat([packetLength, packetType, buffer]);
};
