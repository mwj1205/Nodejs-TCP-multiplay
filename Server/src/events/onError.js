import { upsertGamePosition } from '../db/game/game.db.js';

export const onError = (socket) => async (err) => {
  console.error('Socket error:', err);

  try {
    const user = getUserBySocket(socket);
    // 유저가 게임에 참여중이었다면 제거
    if (user) {
      if (user.gameId) {
        const gameSession = getGameSession(user.gameId);
        if (game) {
          gameSession.removeUser(user.id);
        }
      }
    }

    await upsertGamePosition(user.id, user.x, user.y);

    removeUser(socket);
  } catch (err) {
    handlerError(socket, err);
  }
};
