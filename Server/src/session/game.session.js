import Game from '../classes/models/game.class.js';
import { GAME_FIRST_SESSION_ID, GAME_MAX_PLAYER } from '../constants/env.js';
import { GameSessions } from './sessions.js';

// 게임 세션 추가
export const addGameSession = (id) => {
  const gameSession = new Game(id);
  GameSessions.push(gameSession);
  return gameSession;
};

// 게임 세션 삭제
export const removeGameSession = (id) => {
  if (id === GAME_FIRST_SESSION_ID) return;
  const index = GameSessions.findIndex((game) => game.id === id);
  if (index !== -1) {
    return GameSessions.splice(index, 1)[0];
  }
};

// gameId로 게임세션 검색
export const getGameSession = (id) => {
  return GameSessions.find((game) => game.id === id);
};

// 모든 게임세션
export const getAllGameSession = () => {
  return GameSessions;
};

// 접속 가능한 게임 세션 검색
export const findAvailableGame = () => {
  const gameSessions = getAllGameSession();
  return gameSessions.find((game) => game.users.length < GAME_MAX_PLAYER);
};
