import eventManager from "../core/EventManager.js";

class GameObjectManager {
    constructor() {
        this.state = {
          gameObjects: [],
        };

        eventManager.on("addGameObject", this.addGameObject.bind(this));
        eventManager.on("removeGameObject", this.removeGameObject.bind(this));
    }
  
    get(key) {
      return this.state[key];
    }
  
    set(key, value) {
      this.state[key] = value;
    }
  
    reset() {
      this.state = {
        gameObjects: [],
      };
    }
  
    addGameObject(gameObject) {
      this.state.gameObjects.push(gameObject);
    }

    removeGameObject(gameObject) {
        const index = this.state.gameObjects.indexOf(gameObject);
        if (index !== -1) {
            this.state.gameObjects.splice(index, 1);
        }
    }
  }
  
  export default GameObjectManager;
  