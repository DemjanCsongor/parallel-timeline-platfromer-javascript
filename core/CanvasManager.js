class CanvasManager {
  constructor() {
    const canvas = document.getElementById("canvas");

    const originalWidth = 1024;
    const originalHeight = 576;
    const aspectRatio = originalWidth / originalHeight; // 16 / 9

    this.scale = this.setCanvasSize(canvas, aspectRatio, originalWidth, originalHeight);
    this.c = canvas.getContext("2d");
  }

  setCanvasSize(canvas, aspectRatio, originalWidth, originalHeight) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowAspectRatio = windowWidth / windowHeight;
    let scale;

    if (windowAspectRatio > aspectRatio) {
      // If the window is wider than the aspect ratio, scale by height
      canvas.height = windowHeight;
      canvas.width = windowHeight * aspectRatio;
      scale = canvas.height / originalHeight;
    } else {
      // If the window is narrower than the aspect ratio, scale by width
      canvas.width = windowWidth;
      canvas.height = windowWidth / aspectRatio;
      scale = canvas.width / (originalWidth / aspectRatio);
    }

    // Center the canvas in the window
    canvas.style.position = 'absolute';
    canvas.style.left = `${(windowWidth - canvas.width) / 2}px`;
    canvas.style.top = `${(windowHeight - canvas.height) / 2}px`;

    return scale;
  }

  getCanvasScale() {
    return this.scale;
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
