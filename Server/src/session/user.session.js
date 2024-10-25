import User from '../classes/models/user.class.js';
import { UserSessions } from './sessions.js';

// 유저 세션 추가
export const addUser = (socket, userId) => {
  const user = new User(userId, socket);
  UserSessions.push(user);
  return user;
};

// 유저 세션  삭제
export const removeUser = (socket) => {
  const index = UserSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return UserSessions.splice(index, 1)[0];
  }
};

// id로 유저 검색
export const getUserById = (id) => {
  return UserSessions.find((user) => user.id === id);
};

// 소켓으로 유저 조회
export const getUserBySocket = (socket) => {
  return UserSessions.find((user) => user.socket === socket);
};

export const getAllUsersId = () => {
  return UserSessions.map((user) => user.id);
};
