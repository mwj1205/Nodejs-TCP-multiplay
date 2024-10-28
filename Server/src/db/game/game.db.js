import { toCamelCase } from '../../utils/transformCase.js';
import pools from '../database.js';
import { GAME_DB_SQL_QUERIES } from './game.queries.js';

export const getUserCoordinate = async (deviceId) => {
  const [rows] = await pools.GAME_DB.query(GAME_DB_SQL_QUERIES.GET_GAME_POSITION, [deviceId]);
  console.log('rows[0]: ', rows[0]);
  return toCamelCase(rows[0]);
};

export const upsertGamePosition = async (deviceId, x, y) => {
  await pools.GAME_DB.query(GAME_DB_SQL_QUERIES.UPSERT_GAME_POSITION, [deviceId, x, y]);
};
