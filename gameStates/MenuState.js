import { startGameButton, optionsButton, aboutButton } from "../ui/Buttons/Buttons.js";
import BaseGameState from "./BaseGameState.js";

class MenuState extends BaseGameState {
  constructor() {
    super();
    this.buttons = [startGameButton, optionsButton, aboutButton];
  }

  update() {
    this.buttons.forEach(button => button.handleClick())
  }

  draw() {
    this.c.fillStyle = "rgba(128, 128, 128, 0.5)";
    this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.buttons.forEach(button => button.draw())
  }
}

export default MenuState;
