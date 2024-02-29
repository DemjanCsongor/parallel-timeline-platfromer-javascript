import BaseLevel from "./BaseLevel.js";
import { getRandomColor } from "../utils/utils.js";

class Level1 extends BaseLevel {
  constructor({ playerPosition, levelId = null, isDuplicate = false }) {
    super();
    this.levelId = levelId;
    this.isDuplicate = isDuplicate;
    this.world = {
      width: 10000,
      height: 500,
    };
    this.gradientColor1 = getRandomColor();
    this.gradientColor2 = getRandomColor();
    this.playerStartPosition = playerPosition;
    this.initLevel();
  }

  initLevel() {
    this.addSequentialPlatforms(
      "static",
      { x: 100, y: 300 },
      50,
      200,
      "horizontal"
    );

    this.addSequentialPlatforms(
      "static",
      { x: 0, y: 400 },
      18,
      50,
      "horizontal"
    );

    const platforms = [
      this.platformFactory.createPlatform("static", {
        position: { x: 0, y: 400 },
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 0, y: 0 },
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 0, y: 100 },
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 1900, y: 100 },
      }),
      this.platformFactory.createPlatform("movingHorizontal", {
        position: { x: 200, y: 300 },
        startPoint: { x: 200, y: 300 },
        endPoint: { x: 500, y: 300 },
      }),
      this.platformFactory.createPlatform("movingVertical", {
        position: { x: 200, y: 300 },
        startPoint: { x: 200, y: 300 },
        endPoint: { x: 200, y: 400 },
      }),
      this.platformFactory.createPlatform("disappearing", {
        position: { x: 800, y: 300 },
        disappearDelay: 1000,
      }),
      this.platformFactory.createPlatform("disappearing", {
        position: { x: 300, y: 350 },
        disappearDelay: 1000,
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 1000, y: 300 },
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 1200, y: 300 },
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 1400, y: 300 },
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 1600, y: 300 },
      }),
      this.platformFactory.createPlatform("static", {
        position: { x: 1800, y: 300 },
      }),
    ];

    const items = [
      this.itemFactory.createItem("coin", "silver", {
        position: { x: 30, y: 350 },
      }),
      this.itemFactory.createItem("coin", "golden", {
        position: { x: 50, y: 350 },
      }),
      this.itemFactory.createItem("coin", "gem", {
        position: { x: 70, y: 350 },
      }),
      this.itemFactory.createItem("heart", undefined, {
        position: { x: 90, y: 350 },
      }),
    ];

    const backgroundElements = [
      this.backgroundElementFactory.createBackgroundElement("tree", {
        position: { x: 100, y: 368 },
      }),
    ];

    const checkpoints = [
      this.checkpointFactory.createCheckpoint("basic", {
        position: { x: 50, y: 376 },
      }),
      this.checkpointFactory.createCheckpoint("basic", {
        position: { x: 150, y: 376 },
      }),
      this.checkpointFactory.createCheckpoint("basic", {
        position: { x: 400, y: 376 },
      }),
      this.checkpointFactory.createCheckpoint("basic", {
        position: { x: 600, y: 376 },
      }),
    ];

    this.addBackgroundElements(backgroundElements);
    this.addItems(items);
    this.addPlatforms(platforms);
    this.addCheckpoint(checkpoints);
  }

  drawGradientBackground() {
    let gradient = this.c.createLinearGradient(
      0,
      0,
      this.world.width,
      this.world.height
    );

    if (this.isDuplicate === false) {
      gradient.addColorStop(0, "orange");
      gradient.addColorStop(1, "black");
    } else {
      gradient.addColorStop(0, this.gradientColor1);
      gradient.addColorStop(1, this.gradientColor2);
    }

    this.c.fillStyle = gradient;
    this.c.fillRect(0, 0, this.world.width, this.world.height);
  }
}

export default Level1;
