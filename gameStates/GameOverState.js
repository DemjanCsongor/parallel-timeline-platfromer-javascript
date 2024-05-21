import { backToMenuButton } from "../ui/Buttons/Buttons.js";
import BaseGameState from "./BaseGameState.js";

class GameOverState extends BaseGameState {
  constructor() {
    super();
    this.backToMenuButton = backToMenuButton;
  }

  update() {
    this.backToMenuButton.handleClick();
  }

  draw() {
    this.c.fillStyle = "rgba(128, 128, 128, 1)";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.backToMenuButton.draw();

    this.c.font = "50px Arial";
    this.c.fillStyle = "red";
    this.c.textAlign = "center";
    this.c.fillText(
      "Game Over!",
      this.canvas.width / 2,
      this.canvas.height / 2 - 30
    );
  }
}

export default GameOverState;
