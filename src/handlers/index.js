import { HANDLER_IDS } from '../constants/handlerIds.js';
import initialHandler from './user/initial.handler.js';
import locationUpdateHandler from './game/locationUpdate.handler.js';
import CustomError from '../utils/error/customError.js';
import { ErrorCodes } from '../utils/error/errorCodes.js';

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: 'initial.InitialPayload',
  },
  [HANDLER_IDS.LOCATION_UPDATE]: {
    handler: locationUpdateHandler,
    protoType: 'game.LocationUpdatePayload',
  },
};

/**
 * Id로 핸들러 불러오기
 * @param {*} handlerId
 * @returns
 */
export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }

  return handlers[handlerId].handler;
};

/**
 * Id로 프로토타입 불러오기
 * @param {*} handlerId
 * @returns
 */
export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new CustomError(
      ErrorCodes.UNKNOWN_HANDLER_ID,
      `핸들러를 찾을 수 없습니다: ID ${handlerId}`,
    );
  }

  return handlers[handlerId].protoType;
};
