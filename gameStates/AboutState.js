import { backButton } from "../ui/Button.js";
import BaseGameState from "./BaseGameState.js";

class AboutState extends BaseGameState {
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
    this.c.fillText("This demo was created to demonstrate,", 100, 150);
    this.c.fillText(
      "how parallel timelines can be represented in games",
      100,
      200
    );
  }
}

export default AboutState;
