import Platform from "../objects/platforms/Platform.js";
import MovingPlatform from "../objects/platforms/MovingPlatform.js";
import DisappearingPlatform from "../objects/platforms/DisappearingPlatform.js";

class PlatformFactory {
  createPlatform(type, options) {
    let platform;
    switch (type) {
      case "movingHorizontal":
        platform = new MovingPlatform({
          ...options,
          type: "movingHorizontal",
          imageSrc: "../img/platforms/cloud2.png",
          velocity: options.velocity || { x: 0.5, y: 0 },
          startPoint: options.startPoint,
          endPoint: options.endPoint,
          hitboxWidth: 32,
          hitboxHeight: 14,
        });
        break;
      case "movingVertical":
        platform = new MovingPlatform({
          ...options,
          type: "movingVertical",
          imageSrc: "../img/platforms/cloud3.png",
          velocity: options.velocity || { x: 0, y: 0.3 },
          startPoint: options.startPoint,
          endPoint: options.endPoint,
          hitboxWidth: 48,
          hitboxHeight: 16,
        });
        break;
      case "disappearing":
        platform = new DisappearingPlatform({
          ...options,
          type: "disappearing",
          imageSrc: "../img/platforms/flying3Together.png",
          disappearDelay: options.disappearDelay || 1000,
          hitboxWidth: 48,
          hitboxHeight: 16,
        });
        break;
      default:
        platform = new Platform({
          ...options,
          type: "static",
          imageSrc: "../img/platforms/flying3Together.png",
          hitboxWidth: 48,
          hitboxHeight: 16,
        });
    }
    return platform;
  }
}

export default PlatformFactory;
