import { GAME_FIRST_SESSION_ID } from '../constants/env.js';
import { addGameSession } from '../session/game.session.js';
import { loadProtos } from './loadProto.js';

const initServer = async () => {
  await loadProtos();
  addGameSession(GAME_FIRST_SESSION_ID);
};

export default initServer;
