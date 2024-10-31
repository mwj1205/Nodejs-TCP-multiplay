// player의 Latency 관리할 매니저
class LatencyManager {
  constructor() {
    this.intervals = new Map();
  }

  addUser(userId, callback, interval) {
    if (this.intervals.has(userId)) {
      console.error('중복된 인터벌');
    }
    this.intervals.set(userId, setInterval(callback, interval));
  }

  // 해당 player의 interval 삭제
  removeUser(userId) {
    if (!this.intervals.has(userId)) {
      return;
    }
    clearInterval(this.intervals.get(userId));
  }

  // 모든 interval 삭제
  clearAll() {
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.intervals.clear();
  }
}
export default LatencyManager;
