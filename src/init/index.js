import { loadProtos } from './loadProtos.js';
import { dbAllConnections } from '../utils/db/dbconnection.js';
import pools from '../db/database.js';
import { addGameSession } from '../session/game.session.js';
import { v4 as uuidv4 } from 'uuid';

const initServer = async () => {
  try {
    await loadProtos();
    await dbAllConnections(pools);

    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);
    console.log(gameSession);
  } catch (err) {
    console.error(err);
    process.exit(1); // 에러 발생 시 게임 종료
  }
};

export default initServer;
