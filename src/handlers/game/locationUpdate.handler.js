import { getGameSession } from '../../session/game.session.js';
import { handleError } from '../../utils/error/errorHandler.js';

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;

    const gameSession = getGameSession();
    if (!gameSession) {
      console.error('Game session not found');
    }

    //console.log(gameSession);

    const user = gameSession.getUser(userId);
    if (!user) {
      console.error('User not found');
    }

    // 유저 위치 업데이트
    user.updatePosition(x, y);
    // 자신을 제외한 유저 위치 불러오기
    const locationData = gameSession.getAllLocation(userId);

    socket.write(locationData);
  } catch (err) {
    handleError(socket, err);
  }
};

export default locationUpdateHandler;
