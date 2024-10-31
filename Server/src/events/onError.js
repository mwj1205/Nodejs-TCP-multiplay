import { upsertGamePosition } from '../db/game/game.db.js';
import { getGameSession } from '../session/game.session.js';
import { getUserBySocket, removeUser } from '../session/user.session.js';
import { handlerError } from '../utils/error/errorHandlers.js';

export const onError = (socket) => async (err) => {
  console.error('Socket error:', err);

  try {
    const user = getUserBySocket(socket);
    // 유저가 게임에 참여중이었다면 제거
    if (user) {
      if (user.gameId) {
        const gameSession = getGameSession(user.gameId);
        if (gameSession) {
          gameSession.removeUser(user.id);
          console.log('gameSession: ', gameSession);
        }
      }
    }

    await upsertGamePosition(user.id, user.x, user.y);

    removeUser(socket);
  } catch (err) {
    handlerError(socket, err);
  }
};
