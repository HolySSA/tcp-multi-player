import { loadProtos } from './loadProtos.js';
import { dbAllConnections } from '../utils/db/dbconnection.js';
import pools from '../db/database.js';

const initServer = async () => {
  try {
    await loadProtos();
    await dbAllConnections(pools);
  } catch (err) {
    console.error(err);
    process.exit(1); // 에러 발생 시 게임 종료
  }
};

export default initServer;
