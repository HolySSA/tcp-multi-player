import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { createResponse } from '../../utils/response/createResponse.js';
import { addUser } from '../../session/user.session.js';
import { handleError } from '../../utils/error/errorHandler.js';
import { getGameSession } from '../../session/game.session.js';
import { createUser, findUserByDeviceId, updateUserLogin } from '../../db/user/user.db.js';
import User from '../../classes/models/user.class.js';

const initialHandler = async ({ socket, userId, payload }) => {
  try {
    const { deviceId, playerId, latency } = payload;

    let user = await findUserByDeviceId(deviceId);
    const coords = { x: 0, y: 0 };

    if (!user) {
      await createUser(deviceId);
    } else {
      await updateUserLogin(deviceId);
      coords.x = user.xCoord;
      coords.y = user.yCoord;
    }

    user = new User(socket, deviceId, playerId, latency, coords);

    // 세션에 유저 추가
    addUser(user);
    const gameSession = getGameSession();
    // 게임 세션에 유저 추가
    gameSession.addUser(user);

    const initialResponse = createResponse(HANDLER_IDS.INITIAL, RESPONSE_SUCCESS_CODE, {
      userId: deviceId,
      x: user.x,
      y: user.y,
    });

    // 소켓을 통해 초기화 응답 메시지 전송
    socket.write(initialResponse);
  } catch (err) {
    handleError(socket, err);
  }
};

export default initialHandler;
