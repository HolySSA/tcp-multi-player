import fs from 'fs';
import path from 'path';

/**
 * 주어진 디렉토리 내 모든 proto 파일을 재귀적으로 찾는 함수
 * @param {*} dir
 * @param {*} fileList
 * @returns
 */
export const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      fileList.push(filePath);
    }
  });

  return fileList;
};
