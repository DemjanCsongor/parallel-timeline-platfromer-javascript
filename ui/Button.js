import gameStateManager from "../managers/GameStateManager.js";
import canvasManager from "../core/CanvasManager.js";
import input from "../core/Input.js";

class Button {
  constructor(x, y, width, height, text, action, validStates) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.c = canvasManager.getContext();
    this.canvas = canvasManager.getCanvas();
    this.action = action;
    this.validStates = validStates;
  }

  draw() {
    drawRoundedRect(
      this.c,
      this.x,
      this.y,
      this.width,
      this.height,
      10,
      "#333",
      "#FFF"
    );
    this.c.fillStyle = "white";
    this.c.font = "20px Arial";
    this.c.textAlign = "center";
    this.c.textBaseline = "middle";
    this.c.fillText(
      this.text,
      this.x + this.width / 2,
      this.y + this.height / 2
    );
  }

  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
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

export const startGameButton = new Button(
  canvas.width / 2 - 100,
  canvas.height / 2 - 100,
  200,
  40,
  "Start Game",
  () => {
    gameStateManager.switchToState("playing");
  },
  ["menu"]
);

export const optionsButton = new Button(
  canvas.width / 2 - 100,
  canvas.height / 2 - 40,
  200,
  40,
  "Options",
  () => {
    gameStateManager.switchToState("options");
  },
  ["menu"]
);

export const aboutButton = new Button(
  canvas.width / 2 - 100,
  canvas.height / 2 + 20,
  200,
  40,
  "About",
  () => {
    gameStateManager.switchToState("about");
  },
  ["menu"]
);

export const continueButton = new Button(
  canvas.width / 2 - 100,
  canvas.height / 2 - 60,
  200,
  40,
  "Continue",
  () => {
    gameStateManager.switchToState("playing");
  },
  ["paused"]
);

export const backToMenuButton = new Button(
  canvas.width / 2 - 100,
  canvas.height / 2,
  200,
  40,
  "Back to Menu",
  () => {
    gameStateManager.switchToState("menu");
  },
  ["paused", "gameOver"]
);

export const backButton = new Button(
  10,
  10,
  50,
  50,
  "<-",
  () => {
    gameStateManager.switchToState("menu");
  },
  ["options", "about"]
);
