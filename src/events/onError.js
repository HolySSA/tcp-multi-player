//import { removeUser } from '../session/user.session.js';
//import CustomError from '../utils/error/customError.js';
//import { ErrorCodes } from '../utils/error/errorCodes.js';
//import { handleError } from '../utils/error/errorHandler.js';

export const onError = (socket) => (err) => {
  console.error('Socket error:', err);
  //handleError(socket, new CustomError(ErrorCodes.SOCKET_ERROR, `소켓 오류: ${err.message}`));

  // 세션에서 유저 삭제
  //removeUser(socket);
};
