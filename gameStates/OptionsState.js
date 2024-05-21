import { backButton } from "../ui/Buttons/Buttons.js";
import BaseGameState from "./BaseGameState.js";

class OptionsState extends BaseGameState {
  constructor() {
    super();
    this.backButton = backButton;
  }

  update() {
    this.backButton.handleClick();
  }

  draw() {
    this.c.fillStyle = "rgba(128, 128, 128, 0.5)";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.backButton.draw();

    this.c.font = "40px Arial";
    this.c.fillStyle = "white";
    this.c.textAlign = "left";
    this.c.fillText("Controls:", 500, 150);
    this.c.fillText("Move Right: D", 500, 200);
    this.c.fillText("Move Left: A", 500, 250);
    this.c.fillText("Jump: W", 500, 300);
    this.c.fillText("Throw: T", 500, 350);
    this.c.fillText("Switch Timeline: 1, 2, 3", 500, 400);
  }
}

export default OptionsState;
