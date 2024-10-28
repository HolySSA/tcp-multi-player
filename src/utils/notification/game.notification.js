import { getProtoMessages } from '../../init/loadProtos.js';
import { config } from '../../config/config.js';
import { PACKET_TYPE } from '../../constants/header.js';

/**
 * 패킷을 통해 버퍼 생성 후 전송
 * @param {*} message
 * @param {*} type
 * @returns
 */
const makeNotification = (message, type) => {
  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    message.length + config.packet.totalLength + config.packet.typeLength,
    0,
  );

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(type, 0);

  // 헤더(길이 정보, 타입)와 메시지를 함께 전송 -- 직렬화
  return Buffer.concat([packetLength, packetType, message]);
};

/**
 * Ping 패킷 생성
 * @param {*} timestamp
 * @returns
 */
export const createPingPacket = (timestamp) => {
  const protoMessages = getProtoMessages();
  const ping = protoMessages.common.Ping;

  const payload = { timestamp };
  const message = ping.create(payload);
  const pingPacket = ping.encode(message).finish();

  return makeNotification(pingPacket, PACKET_TYPE.PING);
};

/**
 * 위치 패킷 생성
 * @param {*} users
 * @returns
 */
export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const location = protoMessages.notification.LocationUpdate;

  const payload = { users };
  const message = location.create(payload);
  const locationPacket = location.encode(message).finish();

  return makeNotification(locationPacket, PACKET_TYPE.LOCATION);
};
