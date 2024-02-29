import Checkpoint from "../objects/Checkpoint.js";

class CheckpointFactory {
    createCheckpoint(type, options) {
    let checkpoint;
    switch (type) {
      case "basic":
        checkpoint = new Checkpoint({
          ...options,
          imageSrc: "../../img/checkpoint/flag.png",
          frameCount: 9,
          frameBuffer: 6,
          hitboxWidth: 15,
          hitboxHeight: 30,
        });
        break;
      default:
        break;
    }
    return checkpoint;
  }
}

export default CheckpointFactory;
