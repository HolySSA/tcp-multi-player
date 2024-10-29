import { loadProtos } from './loadProtos.js';
import { addGameSession } from '../session/game.session.js';
import { v4 as uuidv4 } from 'uuid';
import { dbConnection } from '../utils/db/dbconnection.js';
import dbPool from '../db/database.js';

const initServer = async () => {
  try {
    await loadProtos();
    await dbConnection(dbPool);

    const gameId = uuidv4();
    const gameSession = addGameSession(gameId);
    console.log(gameSession);
  } catch (err) {
    console.error(err);
    process.exit(1); // 에러 발생 시 게임 종료
  }
};

export default initServer;
