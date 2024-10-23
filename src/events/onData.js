import { config } from '../config/config.js';
import { packetParser } from '../utils/parser/packetParser.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { handleError } from '../utils/error/errorHandler.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  // 총 헤더 길이 (패킷 길이 정보 + 타입 정보)
  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  // 버퍼는 header + message(payload)이므로 전체 헤더 길이보다는 길어야 한다
  while (socket.buffer.length >= totalHeaderLength) {
    // 패킷 길이 정보 수신 (4바이트)
    const length = socket.buffer.readUInt32BE(0);
    // 패킷 타입 정보 수신 (1바이트)
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    // 패킷 전체 길이 확인 후 데이터 수신
    if (socket.buffer.length >= length) {
      // 헤더 부분 제거
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);

      try {
        switch (packetType) {
          case PACKET_TYPE.PING:
            break;
          case PACKET_TYPE.NORMAL:
            {
              const { handlerId, userId, payload } = packetParser(packet);

              const handler = getHandlerById(handlerId);
              await handler({
                socket,
                userId,
                payload,
              });
            }

            break;
        }
      } catch (err) {
        handleError(socket, err);
      }
    } else {
      // 아직 전체 패킷이 도착 X
      break;
    }
  }
};
