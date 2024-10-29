import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbPool from '../database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createSchema = async () => {
  const sqlDir = path.join(__dirname, '../sql');

  try {
    const sql = fs.readFileSync(sqlDir + '/user.sql', 'utf8');

    const queries = sql
      .split(';')
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    for (const query of queries) {
      await dbPool.query(query);
    }
  } catch (err) {
    console.error('데이터베이스 마이그레이션 중 오류가 발생했습니다:', err);
  }
};

createSchema()
  .then(() => {
    console.log('마이그레이션이 완료되었습니다.');
  })
  .catch((err) => {
    console.error(err);
  });
