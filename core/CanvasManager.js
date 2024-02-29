class CanvasManager {
  constructor(width = 1024, height = 576) {
      const canvas = document.getElementById("canvas");
      canvas.width = width;
      canvas.height = height;
      this.c = canvas.getContext("2d");
  }

  getContext() {
    return this.c;
  }

  getCanvas() {
    return this.c.canvas;
  }
}

const instance = new CanvasManager();

export default instance;
