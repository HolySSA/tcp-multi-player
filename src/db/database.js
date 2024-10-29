import mysql from 'mysql2/promise';
import { config } from '../config/config.js';
import { formatDate } from '../utils/dateFormatter.js';

const { databases } = config;

// 데이터베이스 커넥션 풀 생성 함수
const createPool = () => {
  const pool = mysql.createPool({
    ...config.databases.USER_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    const date = new Date();
    // 쿼리 실행시 로그
    console.log(
      `[${formatDate(date)}] Executing query: ${sql} ${
        params ? `, ${JSON.stringify(params)}` : ``
      }`,
    );

    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

const dbPool = createPool();

export default dbPool;
