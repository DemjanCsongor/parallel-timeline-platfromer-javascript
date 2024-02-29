import Platform from "./Platform.js";

class MovingPlatform extends Platform {
  constructor({ startPoint, endPoint, velocity, ...options }) {
    super(options);
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.velocity = velocity;
  }

  update() {
    super.update();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (
      (this.velocity.x > 0 && this.position.x >= this.endPoint.x) ||
      (this.velocity.x < 0 && this.position.x <= this.startPoint.x)
    ) {
      this.velocity.x = -this.velocity.x;
    }
    if (
      (this.velocity.y > 0 && this.position.y >= this.endPoint.y) ||
      (this.velocity.y < 0 && this.position.y <= this.startPoint.y)
    ) {
      this.velocity.y = -this.velocity.y;
    }
  }

  draw() {
    super.draw();
  }
}

export default MovingPlatform;
