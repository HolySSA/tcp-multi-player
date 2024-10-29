import {
  PORT,
  HOST,
  CLIENT_VERSION,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
} from '../constants/env.js';
import { PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';

export const config = {
  server: {
    port: PORT,
    host: HOST,
  },
  client: {
    version: CLIENT_VERSION,
  },
  packet: {
    totalLength: TOTAL_LENGTH,
    typeLength: PACKET_TYPE_LENGTH,
  },
  databases: {
    USER_DB: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
    },
  },
};
