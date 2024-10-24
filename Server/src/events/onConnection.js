import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
import { onError } from './onError.js';

export const onConnection = (socket) => {
  console.log(`Client connected from :${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('data', onData);
  socket.on('end', onEnd);
  socket.on('error', onError);
};
