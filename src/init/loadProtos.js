import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetNames.js';
import { getAllProtoFiles } from './protoFiles.js';

// 현재 파일의 절대경로
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 상위 경로 + protobuf 폴더
const protoDir = path.join(__dirname, '../protobuf');

// 모든 proto 파일 경로를 가져오기
const protoFiles = getAllProtoFiles(protoDir);

// 로드된 프로토 메시지들을 저장할 객체
const protoMessages = {};

/**
 * 모든 .proto 파일을 로드하여 프로토 메시지 초기화
 */
export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    // 비동기 병렬 처리로 프로토 파일 로드
    await Promise.all(protoFiles.map((file) => root.load(file)));

    // packetNames 패킷들 등록
    for (const [namespace, types] of Object.entries(packetNames)) {
      protoMessages[namespace] = {};
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[namespace][type] = root.lookupType(typeName);
      }
    }

    console.log('Protobuf 파일이 로드되었습니다.');
  } catch (err) {
    console.error('Protobuf 파일 로드 중 오류가 발생했습니다:', err);
  }
};

/**
 * ProtoMessage
 * @returns
 */
export const getProtoMessages = () => {
  // console.log('protoMessages:', protoMessages);

  // 얕은 복사로 안정성 높이기
  return { ...protoMessages };
};
