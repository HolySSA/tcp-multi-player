import User from '../classes/models/user.class.js';
import { userSessions } from './sessions.js';

/**
 * 유저 추가
 * @param {*} socket
 * @param {*} uuid
 * @returns
 */
export const addUser = (socket, uuid, playerId, latency) => {
  const user = new User(socket, uuid, playerId, latency);
  userSessions.push(user);

  return user;
};

/**
 * 유저 제거
 * @param {*} socket
 * @returns
 */
export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);

  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

/**
 * userId로 유저 불러오기
 * @param {*} id
 * @returns
 */
export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};

export const getAllUsers = () => {
  return userSessions;
};
