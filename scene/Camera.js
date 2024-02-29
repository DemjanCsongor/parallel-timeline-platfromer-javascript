class Camera {
  constructor({ world, canvas, scale }) {
    this.world = world;
    this.canvas = canvas;
    this.scale = scale;
    this.width = canvas.width;
    this.height = canvas.height;
    this.position = { x: 0, y: -this.world.height + this.canvas.height / scale };
    this.following = null;
  }

  follow(gameObject) {
    this.following = gameObject;
    console.log("following:", this.following);
  }

  update(gameObject) {
    if (this.following) {
      this.position.x = gameObject.position.x - this.width / (2 * this.scale);
      this.position.y = gameObject.position.y - this.height / (2 * this.scale);
      this.position.x = Math.max(0, Math.min(this.position.x, this.world.width - this.width / this.scale));
      this.position.y = Math.max(0, Math.min(this.position.y, this.world.height - this.height / this.scale));
  
    }
  }

  moveTo(x, y) {
    this.position.x = x - this.width / 2;
    this.position.y = y - this.height / 2;
  }

  getViewport() {
    return {
      x: this.position.x,
      y: this.position.y,
      width: this.width / (2 * this.scale),
      height: this.height / (2 * this.scale),
    };
  }
}

export default Camera;
