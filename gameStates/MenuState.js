import { startGameButton, optionsButton, aboutButton } from "../ui/Button.js";
import BaseGameState from "./BaseGameState.js";

class MenuState extends BaseGameState {
  constructor() {
    super();
    this.startGameButton = startGameButton;
    this.optionsButton = optionsButton;
    this.aboutButton = aboutButton;
  }

  update() {
    this.startGameButton.handleClick();
    this.optionsButton.handleClick();
    this.aboutButton.handleClick();
  }

  draw() {
    this.c.fillStyle = "rgba(128, 128, 128, 0.5)";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.startGameButton.draw();
    this.optionsButton.draw();
    this.aboutButton.draw();
  }
}

export default MenuState;
