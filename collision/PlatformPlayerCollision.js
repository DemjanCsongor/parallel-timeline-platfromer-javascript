import { collision } from "../utils/utils.js";
import MovingPlatform from "../objects/platforms/MovingPlatform.js";
import DisappearingPlatform from "../objects/platforms/DisappearingPlatform.js";

class PlatformPlayerCollision {
  constructor({ playerMovement, hitbox, platforms }) {
    this.playerMovement = playerMovement;
    this.platforms = platforms;
    this.hitbox = hitbox;
  }

  update() {
    this.checkForCollisions();
  }

  checkForCollisions() {
    for (let i = 0; i < this.platforms.length; i++) {
      const platform = this.platforms[i];
      if (collision({ object1: this.hitbox, object2: platform })) {
        if (platform instanceof DisappearingPlatform) {
          this.handleDisappearingPlatformCollision(platform, i);
          console.log("disappearing platform collision");
        } else {
          this.adjustPositionAfterCollision(platform);
        }
        break;
      }
    }
  }

  handleDisappearingPlatformCollision(platform, index) {
    platform.startDisappearTimer(() => {
      this.platforms.splice(index, 1);
    });
    this.adjustPositionAfterCollision(platform);
  }

  adjustPositionAfterCollision(platform) {
    const offsetHorizontal = this.hitbox.position.x - this.playerMovement.position.x;
    const offsetVertical = this.hitbox.position.y - this.playerMovement.position.y;

    this.playerMovement.jumps = 0;

    let caseKey = this.getCaseKey();

    const playerPosition = this.getPlayerRelativePosition(
      this.hitbox,
      platform
    );

    switch (caseKey) {
      case "11": // velocity.x > 0 && velocity.y > 0
        this.playerMovement.position.y =
          platform.hitbox.position.y -
          offsetVertical -
          this.hitbox.height -
          0.01;
        break;
      case "1-1": // velocity.x > 0 && velocity.y < 0
        if (playerPosition === "above" || playerPosition === "beside") {
          this.playerMovement.position.y =
            platform.hitbox.position.y -
            offsetVertical -
            this.hitbox.height -
            0.01;
        } else {
          this.playerMovement.position.y =
            platform.hitbox.position.y +
            platform.hitbox.height -
            offsetVertical +
            0.01;
        }
        break;
      case "10": // velocity.x > 0 && velocity.y == 0
        if (platform instanceof MovingPlatform && platform.velocity.y !== 0) {
          this.playerMovement.position.y =
            platform.hitbox.position.y -
            offsetVertical -
            this.hitbox.height -
            0.01;
        } else {
          this.playerMovement.position.x =
            platform.hitbox.position.x -
            offsetHorizontal -
            this.hitbox.width -
            0.01;
        }
        break;
      case "-11": // velocity.x < 0 && velocity.y > 0
        this.playerMovement.position.y =
          platform.hitbox.position.y -
          offsetVertical -
          this.hitbox.height -
          0.01;
        break;
      case "-1-1": // velocity.x < 0 && velocity.y < 0
        if (playerPosition === "above" || playerPosition === "beside") {
          this.playerMovement.position.y =
            platform.hitbox.position.y -
            offsetVertical -
            this.hitbox.height -
            0.01;
        } else {
          this.playerMovement.position.y =
            platform.hitbox.position.y +
            platform.hitbox.height -
            offsetVertical +
            0.01;
        }
        break;
      case "-10": // velocity.x < 0 && velocity.y == 0
        if (platform instanceof MovingPlatform && platform.velocity.y !== 0) {
          this.playerMovement.position.y =
            platform.hitbox.position.y -
            offsetVertical -
            this.hitbox.height -
            0.01;
        } else {
          this.playerMovement.position.x =
            platform.hitbox.position.x +
            platform.hitbox.width -
            offsetHorizontal +
            0.01;
        }
        this.playerMovement.jumps = 0;
        break;
      case "01": // velocity.x == 0 && velocity.y > 0
        this.playerMovement.velocity.y = 0;
        this.playerMovement.position.y =
          platform.hitbox.position.y -
          offsetVertical -
          this.hitbox.height -
          0.01;
        this.playerMovement.jumps = 0;
        break;
      case "0-1": // velocity.x == 0 && velocity.y < 0
        this.playerMovement.velocity.y = 0;
        this.playerMovement.position.y =
          platform.hitbox.position.y +
          platform.hitbox.height -
          offsetVertical +
          0.01;
        this.playerMovement.jumps = 0;
        break;
      case "00": // velocity.x == 0 && velocity.y == 0
        if (platform instanceof MovingPlatform) {
          if (platform.velocity.x !== 0) {
            this.playerMovement.position.x += platform.velocity.x;
          }
          if (platform.velocity.y !== 0) {
            this.playerMovement.position.y =
              platform.hitbox.position.y -
              offsetVertical -
              this.hitbox.height -
              0.01;
          }
        } else {
          this.pushPlayerAbovePlatform(platform, offsetVertical);
        }
        break;
      default:
        console.log("Unhandled case: " + caseKey);
        break;
    }
  }

  getCaseKey() {
    return (
      (this.playerMovement.velocity.x > 0
        ? "1"
        : this.playerMovement.velocity.x < 0
        ? "-1"
        : "0") +
      (this.playerMovement.velocity.y > 0
        ? "1"
        : this.playerMovement.velocity.y < 0
        ? "-1"
        : "0")
    );
  }

  adjustPositionForMovingPlatform(platform) {
    if (platform.velocity.x !== 0)
      this.playerMovement.position.x += platform.velocity.x;
    if (platform.velocity.y !== 0)
      this.playerMovement.position.y += platform.velocity.y;
  }

  pushPlayerAbovePlatform(platform, offsetVertical) {
    this.playerMovement.position.y =
      platform.hitbox.position.y - offsetVertical - this.hitbox.height - 0.01;
  }

  getPlayerRelativePosition(hitbox, platform) {
    const playerTop = hitbox.position.y;
    const playerBottom = hitbox.position.y + hitbox.height;
    const platformTop = platform.hitbox.position.y + 1;
    const platformBottom = platform.hitbox.position.y + platform.hitbox.height;
    const playerLeftSide = hitbox.position.x;
    const playerRightSide = hitbox.position.x + this.hitbox.width;
    const platfromLeftSide = platform.hitbox.position.x;
    const platfromRightSide =
      platform.hitbox.position.x + platform.hitbox.width;

    if (
      playerLeftSide < platfromLeftSide ||
      playerRightSide > platfromRightSide
    ) {
      return "beside";
    } else if (playerBottom <= platformTop) {
      return "above";
    } else if (platformBottom >= playerTop) {
      this.playerMovement.velocity.y = 0;
      return "below";
    } else {
      return "beside";
    }
  }
}

export default PlatformPlayerCollision;
