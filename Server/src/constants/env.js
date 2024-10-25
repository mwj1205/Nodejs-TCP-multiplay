import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || '5555';
export const CLIENT_VERSION = process.env.CLIENT_VERSION || '1.0.0';

export const GAME_FIRST_SESSION_ID = 'number-one';
export const GAME_MAX_PLAYER = 30;
