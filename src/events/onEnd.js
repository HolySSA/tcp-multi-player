import { getGameSession } from '../session/game.session.js';
import { removeUser } from '../session/user.session.js';

export const onEnd = (socket) => async () => {
  console.log('클라이언트 연결이 종료되었습니다.');

  const gameSession = getGameSession();
  gameSession.removeUser(socket);

  // 세션에서 유저 삭제
  await removeUser(socket);
};
