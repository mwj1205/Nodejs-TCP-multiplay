import { v4 as uuidv4 } from 'uuid';
import pools from '../database.js';
import { USER_DB_SQL_QUERIES } from './user.queries.js';
import { toCamelCase } from '../../utils/transformCase.js';

// 작성한 query 실행
export const findUserByDeviceId = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(USER_DB_SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
  console.log('rows[0]: ', rows[0]);
  return toCamelCase(rows[0]);
};

export const createUser = async (deviceId) => {
  const id = uuidv4();
  await pools.USER_DB.query(USER_DB_SQL_QUERIES.CREATE_USER, [id, deviceId]);
  return { id, deviceId };
};

export const updateUserLogin = async (id) => {
  await pools.USER_DB.query(USER_DB_SQL_QUERIES.UPDATE_USER_LOGIN, [id]);
};
