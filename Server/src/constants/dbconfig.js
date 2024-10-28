// dbconfig.js
import {
  DB1_NAME,
  DB1_USER,
  DB1_PASSWORD,
  DB1_HOST,
  DB1_PORT,
  DB2_NAME,
  DB2_USER,
  DB2_PASSWORD,
  DB2_HOST,
  DB2_PORT,
} from './env';

export const dbconfig = {
  GAME_DB: {
    name: DB1_NAME,
    user: DB1_USER,
    password: DB1_PASSWORD,
    host: DB1_HOST,
    port: DB1_PORT,
  },
  USER_DB: {
    name: DB2_NAME,
    user: DB2_USER,
    password: DB2_PASSWORD,
    host: DB2_HOST,
    port: DB2_PORT,
  },
};
