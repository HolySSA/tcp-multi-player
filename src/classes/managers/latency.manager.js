import BaseManager from './base.manager.js';

class LatencyManager extends BaseManager {
  constructor() {
    super();

    this.intervals = new Map();
  }

  addUser(userId, callback, timestamp) {
    if (this.intervals.has(userId)) {
      console.error('중복된 인터벌이 존재합니다.');
    }

    this.intervals.set(userId, setInterval(callback, timestamp));
  }

  removeUser(userId) {
    if (!this.intervals.has(userId)) return;

    clearInterval(this.intervals.get(userId));
  }

  clearAll() {
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });

    this.intervals.clear();
  }
}

export default LatencyManager;
