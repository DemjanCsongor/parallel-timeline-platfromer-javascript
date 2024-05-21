import gameStateManager from "../../managers/GameStateManager.js";
import canvasManager from "../../core/CanvasManager.js";
import input from "../../core/Input.js";


class Button {
  constructor(relX, relY, relWidth, relHeight, text, action, validStates) {
    this.relX = relX;
    this.relY = relY;
    this.relWidth = relWidth;
    this.relHeight = relHeight;
    this.text = text;
    this.action = action;
    this.validStates = validStates;

    this.c = canvasManager.getContext();
    this.canvas = canvasManager.getCanvas();
    this.updateScale();
  }

  updateScale() {
    this.canvasScale = canvasManager.getCanvasScale();
    this.updateDimensions();
  }

  updateDimensions() {
    // Convert relative dimensions to absolute dimensions based on canvas size
    this.width = this.relWidth * this.canvas.width;
    this.height = this.relHeight * this.canvas.height;
    this.x = this.relX * this.canvas.width - this.width / 2;
    this.y = this.relY * this.canvas.height - this.height / 2;
  }

  draw() {
    this.updateScale(); // Ensure we have the latest scale?

    drawRoundedRect(
      this.c,
      this.x,
      this.y,
      this.width,
      this.height,
      10 * this.canvasScale,
      "#333",
      "#FFF"
    );
    this.c.fillStyle = "white";
    this.c.font = `${10 * this.canvasScale}px Arial`;
    this.c.textAlign = "center";
    this.c.textBaseline = "middle";
    this.c.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }

  isClicked(mouseX, mouseY) {
    const rect = this.canvas.getBoundingClientRect(); // Get canvas position relative to the viewport

    // Translate mouse coordinates to canvas coordinates
    const canvasMouseX = (mouseX - rect.left) * (this.canvas.width / rect.width);
    const canvasMouseY = (mouseY - rect.top) * (this.canvas.height / rect.height);

    return (
      canvasMouseX >= this.x &&
      canvasMouseX <= this.x + this.width &&
      canvasMouseY >= this.y &&
      canvasMouseY <= this.y + this.height
    );
  }

  handleClick() {
    const gameState = gameStateManager.getCurrentStateName();
    if (!this.validStates.includes(gameState)) {
      return;
    }

    const { x: mouseX, y: mouseY } = input.getMousePosition();
    if (this.isClicked(mouseX, mouseY)) {
      if (input.wasMouseButtonPressed("left")) {
        this.action();
      }
    }
  }
}

function drawRoundedRect(
  c,
  x,
  y,
  width,
  height,
  radius,
  fillColor,
  strokeColor
) {
  c.fillStyle = fillColor;
  c.strokeStyle = strokeColor;
  c.beginPath();
  c.moveTo(x + radius, y);
  c.lineTo(x + width - radius, y);
  c.quadraticCurveTo(x + width, y, x + width, y + radius);
  c.lineTo(x + width, y + height - radius);
  c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  c.lineTo(x + radius, y + height);
  c.quadraticCurveTo(x, y + height, x, y + height - radius);
  c.lineTo(x, y + radius);
  c.quadraticCurveTo(x, y, x + radius, y);
  c.closePath();
  c.fill();
  c.stroke();
}

export default Button;
