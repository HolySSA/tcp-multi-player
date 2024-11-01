import { updateUserLocation } from '../db/user/user.db.js';
import { userSessions } from './sessions.js';

/**
 * 유저 추가
 * @param {*} socket
 * @param {*} uuid
 * @returns
 */
export const addUser = (user) => {
  userSessions.push(user);

  return user;
};

/**
 * 유저 제거
 * @param {*} socket
 * @returns
 */
export const removeUser = async (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);

  if (index !== -1) {
    // 게임 종료 시 마지막 위치 저장
    const user = userSessions[index];
    await updateUserLocation(user.x, user.y, user.id);

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

/**
 * socket으로 유저 불러오기
 * @param {*} socket
 * @returns
 */
export const getUserBySocket = (socket) => {
  const user = userSessions.find((user) => user.socket === socket);

  if (!user) {
    console.error('User not found: getUserBySocket');
    return;
  }

  return user;
};

export const getAllUsers = () => {
  return userSessions;
};
