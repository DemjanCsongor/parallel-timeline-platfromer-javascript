import canvasManager from "../core/CanvasManager.js";

class HitboxComponent {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.position = { x: 0, y: 0 };
    this.offset = { x: 0, y: 0 };
    this.c = canvasManager.getContext();
  }

  setHitbox(position, offsetX = 0, offsetY = 0) {
    this.offset.x = offsetX;
    this.offset.y = offsetY;
    this.position = {
      x: position.x - (this.width / 2) + this.offset.x,
      y: position.y - (this.height / 2)+ this.offset.y,
    };
  }

  drawHitbox() {
    this.c.strokeStyle = "red";
    this.c.lineWidth = 1;
    this.c.strokeRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export default HitboxComponent;
