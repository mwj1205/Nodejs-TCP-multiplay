import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';

export const onConnection = (socket) => {
  console.log(`Client connected from :${socket.remoteAddress}:${socket.remotePort}`);

  // 클라이언트마다 하나의 버퍼 유지
  // 이 버퍼에 들어온 데이터를 저장할 것임
  socket.buffer = Buffer.alloc(0);

  socket.on('data', onData);
  socket.on('end', onEnd);
  socket.on('error', onError);
};
