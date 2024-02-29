class GameStateManager {
  constructor() {
    this.states = {};
    this.currentState = null;
  }

  registerState(name, state) {
    this.states[name] = state;
  }

  switchToState(name) {
    this.currentState = this.states[name];
    this.currentName = name;
  }

  getCurrentStateName() {
    return this.currentName;
  }

  getCurrentState() {
    return this.currentState;
  }

  update() {
    if (this.currentState) {
      this.currentState.update();
    }
  }

  draw() {
    if (this.currentState) {
      this.currentState.draw();
    }
  }
}

const instance = new GameStateManager();

export default instance;
