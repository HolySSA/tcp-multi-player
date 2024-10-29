import { createPingPacket } from '../../utils/notification/game.notification.js';

class User {
  constructor(socket, id, playerId, latency, coords) {
    this.socket = socket;
    this.id = id;
    this.playerId = playerId;
    this.latency = latency;

    this.x = coords.x;
    this.y = coords.y;

    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;

    this.lastUpdateTime = Date.now();
  }

  ping() {
    const now = Date.now();

    console.log(`${this.id}: ping`);
    this.socket.write(createPingPacket(now));
  }

  handlePong(data) {
    const now = Date.now();
    this.latency = (now - data.timestamp) / 2;

    // console.log(`Received pong from user ${this.id} at ${now} with latency ${this.latency}ms`);
  }
}

export default User;
