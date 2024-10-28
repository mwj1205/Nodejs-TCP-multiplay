import mysql from 'mysql2/promise';
import { dbconfig } from '../constants/dbconfig.js';
import { formatDate } from '../utils/db/dateFormatter.js';

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true, // 커넥션 풀 가득 차면 다음 요청 어떻게?
    connectionLimit: 10, // 커넥션 풀에서 최대 연결 수
    queueLimit: 0, // 0일 경우 무제한 대기열
  });
  const originQuery = pool.query;

  pool.query = (sql, params) => {
    // 쿼리 로그 터미널에 띄우기
    const date = new Date();
    console.log(
      `[${formatDate(date)}] Executing query : ${sql} ${params ? `${JSON.stringify(params)}` : ``}`,
    );
    return originQuery.call(pool, sql, params);
  };

  return pool;
};

const pools = {
  GAME_DB: createPool(dbconfig.GAME_DB),
  USER_DB: createPool(dbconfig.USER_DB),
};

export default pools;
