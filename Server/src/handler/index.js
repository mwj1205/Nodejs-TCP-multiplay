import { HANDLER_IDS } from '../constants/handlerIds.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    protoType: 'initial.InitialPayload',
  },
  [HANDLER_IDS.LOCATION_UPDATE]: {
    protoType: 'game.LocationUpdatePayload',
  },
};

// handerId로 proto type을 반환하는 함수
export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }
  return handlers[handlerId].protoType;
};
