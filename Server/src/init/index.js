import { GAME_FIRST_SESSION_ID } from '../constants/env.js';
import pools from '../db/database.js';
import { addGameSession } from '../session/game.session.js';
import { testAllConnections } from '../utils/db/testconnection.js';
import { loadProtos } from './loadProto.js';

const initServer = async () => {
  try {
    await loadProtos();
    await testAllConnections(pools);
    // 게임 세션 생성
    addGameSession(GAME_FIRST_SESSION_ID);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default initServer;
