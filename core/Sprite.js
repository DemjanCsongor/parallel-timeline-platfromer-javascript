import canvasManager from "../core/CanvasManager.js";
import FacingComponent from "../components/FacingComponent.js";

export class Sprite {
  constructor({
    position,
    imageSrc,
    frameCount = 1,
    frameBuffer,
    startFrame = 0,
    endFrame = null,
    scale = 1,
  }) {
    this.c = canvasManager.getContext();
    this.position = position;
    this.scale = scale;
    this.loaded = false;
    this.image = new Image();
    this.image.onload = () => {
      this.width = (this.image.width / this.frameCount) * this.scale;
      this.height = this.image.height * this.scale;
      this.loaded = true;
    };
    this.image.src = imageSrc;
    this.frameCount = frameCount;
    this.currentFrame = startFrame;
    this.endFrame = endFrame;
    this.frameBuffer = frameBuffer;
    this.elapsedFrames = 0;
    this.facingComponent = new FacingComponent("right");
  }

  draw() {
    if (!this.image) return;

    const cropbox = {
      position: {
        x: this.currentFrame * (this.image.width / this.frameCount),
        y: 0,
      },
      width: this.image.width / this.frameCount,
      height: this.image.height,
    };

    this.facingComponent.flipContext(this.c, this.position.x);

    this.c.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      this.height
    );

    this.facingComponent.restoreContext(this.c);
  }

  update() {
    this.updateFrames();
  }

  updateFrames() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.frameBuffer === 0) {
      if (
        this.currentFrame < this.frameCount - 1 &&
        (this.endFrame === null || this.currentFrame < this.endFrame)
      ) {
        this.currentFrame++;
      } else if (this.endFrame !== null && this.currentFrame >= this.endFrame) {
      } else {
        this.currentFrame = 0;
      }
    }
  }
}

export default Sprite;
