class EventManager {
  constructor() {
    this.listeners = {};
  }

  on(eventType, callback) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  emit(eventType, data) {
    const callbacks = this.listeners[eventType];
    if (!callbacks) return;
    callbacks.forEach((callback) => callback(data));
  }
}

const eventManager = new EventManager();

export default eventManager;
