import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { addUser } from '../../session/user.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getGameSession } from '../../session/game.session.js';

const initialHandler = ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;

    // 세션에 유저 추가
    const user = addUser(socket, deviceId, playerId, latency);
    const gameSession = getGameSession();

    // 게임 세션에 유저 추가
    gameSession.addUser(user);

    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
      userId: deviceId,
    });

    // 소켓을 통해 초기화 응답 메시지 전송
    socket.write(initialResponse);
  } catch (err) {
    handleError(socket, err);
  }
};

export default initialHandler;
