import net from 'net';
import { HOST, PORT } from './constants/env.js';
import { onConnection } from './events/onConnection.js';
import initServer from './init/index.js';
const server = net.createServer(onConnection);

// 서버 시동
const StartServer = async () => {
  try {
    // 서버 초기화
    await initServer();
    server.listen(PORT, HOST, () => {
      console.log(`Server is on ${HOST}:${PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

StartServer();
