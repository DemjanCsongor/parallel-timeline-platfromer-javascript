import PlatformFactory from "../factories/PlatformFactory.js";
import ItemFactory from "../factories/ItemFactory.js";
import BackgroundElementFactory from "../factories/BackgroundElementFactory.js";
import CheckpointFactory from "../factories/CheckpointFactory.js";
import GameObjectManager from "../managers/GameObjectManager.js";
import canvasManager from "../core/CanvasManager.js";

class BaseLevel {
  constructor() {
    this.c = canvasManager.getContext();
    this.platforms = [];
    this.items = [];
    this.checkpoints = [];
    this.backgroundElements = [];
    this.world = {
      width: 1000,
      height: 500,
    };
    this.playerStartPosition = { x: 100, y: 100 };
    this.platformFactory = new PlatformFactory();
    this.itemFactory = new ItemFactory();
    this.backgroundElementFactory = new BackgroundElementFactory();
    this.checkpointFactory = new CheckpointFactory();
    this.gameDataManager = new GameObjectManager();
  }

  addBackgroundElements(elementArray) {
    this.backgroundElements.push(...elementArray);
  }

  addCheckpoint(checkpointArray) {
    this.checkpoints.push(...checkpointArray);
  }

  addPlatforms(platformArray) {
    this.platforms.push(...platformArray);
  }

  addItems(itemArray) {
    this.items.push(...itemArray);
  }

  addSequentialPlatforms(
    type,
    startPosition,
    count,
    spacing,
    orientation = "horizontal",
    additionalOptions = {}
  ) {
    const platforms = [];
    for (let i = 0; i < count; i++) {
      const position = {
        x:
          orientation === "horizontal"
            ? startPosition.x + i * spacing
            : startPosition.x,
        y:
          orientation === "vertical"
            ? startPosition.y + i * spacing
            : startPosition.y,
      };
      const platform = this.platformFactory.createPlatform(type, {
        position,
        ...additionalOptions,
      });
      platforms.push(platform);
    }
    this.addPlatforms(platforms);
  }

  drawGradientBackground() {}

  draw() {
    this.drawGradientBackground();
    this.backgroundElements.forEach((element) => element.draw());
    this.platforms.forEach((platform) => platform.draw());
    this.items.forEach((item) => item.draw());
    this.gameDataManager
      .get("gameObjects")
      .forEach((gameObject) => gameObject.draw());
    this.checkpoints.forEach((checkpoint) => checkpoint.draw());
  }

  update() {
    this.backgroundElements.forEach((element) => element.update());
    this.platforms.forEach((platform) => platform.update());
    this.items.forEach((item) => item.update());
    this.gameDataManager
      .get("gameObjects")
      .forEach((gameObject) => gameObject.update());
    this.checkpoints.forEach((checkpoint) => checkpoint.update());
  }
}

export default BaseLevel;
