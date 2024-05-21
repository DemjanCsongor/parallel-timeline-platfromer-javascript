import Button from './Button.js';
import gameStateManager from "../../managers/GameStateManager.js";

export const startGameButton = new Button(
  0.5,  // Relative X position (50% from left)
  0.4,  // Relative Y position (40% from top)
  0.2,  // Relative width (20% of canvas width)
  0.09,  // Relative height (10% of canvas height)
  "Start Game",
  () => {
    gameStateManager.switchToState("playing");
  },
  ["menu"]
);

export const optionsButton = new Button(
  0.5,
  0.5,
  0.2,
  0.09,
  "Options",
  () => {
    gameStateManager.switchToState("options");
  },
  ["menu"]
);

export const aboutButton = new Button(
  0.5,
  0.6,
  0.2,
  0.09,
  "About",
  () => {
    gameStateManager.switchToState("about");
  },
  ["menu"]
);

export const continueButton = new Button(
  0.5,
  0.4,
  0.2,
  0.09,
  "Continue",
  () => {
    gameStateManager.switchToState("playing");
  },
  ["paused"]
);

export const backToMenuButton = new Button(
  0.5,
  0.5,
  0.2,
  0.09,
  "Back to Menu",
  () => {
    gameStateManager.switchToState("menu");
  },
  ["paused", "gameOver"]
);

export const backButton = new Button(
  0.1,
  0.1,
  0.1,
  0.1,
  "<-",
  () => {
    gameStateManager.switchToState("menu");
  },
  ["options", "about"]
);
