import net from 'net';
import { HOST, PORT } from './constants/env.js';

const server = net.createServer();

server.listen(PORT, HOST, () => {
  console.log(`Server is on ${HOST}:${PORT}`);
});
