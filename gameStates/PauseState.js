import { continueButton, backToMenuButton } from "../ui/Button.js";
import BaseGameState from "./BaseGameState.js";

class PauseState extends BaseGameState {
  constructor() {
    super();
    this.continueButton = continueButton;
    this.backToMenuButton = backToMenuButton;
  }

  update() {
    this.continueButton.handleClick();
    this.backToMenuButton.handleClick();
  }

  draw() {
    this.c.fillStyle = "rgba(128, 128, 128, 0.1)";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.continueButton.draw();
    this.backToMenuButton.draw();
  }
}

export default PauseState;
