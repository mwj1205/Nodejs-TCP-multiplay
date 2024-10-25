import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from 'protobufjs';
import { packetNames } from '../protobuf/packetName.js';

// 현재 파일의 위치
const __filename = fileURLToPath(import.meta.url);
// 이 파일이 담긴 폴더 경로
const __dirname = path.dirname(__filename);
// src/protobuf 폴더 경로
const protoDir = path.join(__dirname, '../protobuf');

const getAllProtoFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file); // files에 들어있는 하나의 파일의 경로
    // 폴더 안에 폴더가 있는 경우가 있기 때문에 재귀로 호출
    if (fs.statSync(filePath).isDirectory()) {
      getAllProtoFiles(filePath, fileList);
    } else if (path.extname(file) === '.proto') {
      // 확장자명이 .proto라면 원하는 파일이었으니까 추가
      fileList.push(filePath);
    }
  });

  return fileList;
};

const protoFiles = getAllProtoFiles(protoDir);

// 프로토 버퍼 파일 저장할 객체
const protoMessages = {};

export const loadProtos = async () => {
  try {
    const root = new protobuf.Root();

    // map 매서드로 병렬처리 하도록 함
    await Promise.all(protoFiles.map((file) => root.load(file)));

    for (const [packetName, types] of Object.entries(packetNames)) {
      protoMessages[packetName] = {};
      // 해당 패킷 안에 여러 개의 패킷이 존재할 수도 있기 때문에 for문
      for (const [type, typeName] of Object.entries(types)) {
        protoMessages[packetName][type] = root.lookupType(typeName);
      }
    }
    console.log('Protobuf 파일이 로드되었습니다.');
    // console.log('protoMessages: ', protoMessages);
  } catch (e) {
    console.error('Protobuf 파일 로드 중 오류가 발생했습니다.', e);
  }
};

// protoMessages의 내용이 변하지 않도록 얕은 복사로 리턴
export const getProtoMessages = () => {
  return { ...protoMessages };
};
