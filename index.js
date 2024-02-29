import gameStateManager from "./managers/GameStateManager.js";
import canvasManager from "./core/CanvasManager.js";
import LevelManager from "./managers/LevelManager.js";
import Level1 from "./levels/Level1.js";
import PlayingState from "./gameStates/PlayingState.js";
import MenuState from "./gameStates/MenuState.js";
import OptionsState from "./gameStates/OptionsState.js";
import AboutState from "./gameStates/AboutState.js";
import PauseState from "./gameStates/PauseState.js";
import GameOverState from "./gameStates/GameOverState.js";

const playerStartPosition = { x: 100, y: 100 };

const levels = [new Level1({ playerPosition: playerStartPosition })];
const levelManager = new LevelManager(levels);
const playingState = new PlayingState(levelManager);
const menuState = new MenuState();
const optionsState = new OptionsState();
const aboutState = new AboutState();
const pausedState = new PauseState();
const gameOverState = new GameOverState();

gameStateManager.registerState("playing", playingState);
gameStateManager.registerState("menu", menuState);
gameStateManager.registerState("options", optionsState);
gameStateManager.registerState("about", aboutState);
gameStateManager.registerState("paused", pausedState);
gameStateManager.registerState("gameOver", gameOverState);

gameStateManager.switchToState("menu");

const c = canvasManager.getContext();
const canvas = canvasManager.getCanvas();

let secondsPassed, oldTimeStamp, fps;

function gameLoop(timeStamp) {
  requestAnimationFrame(gameLoop);
  c.clearRect(0, 0, canvas.width, canvas.height);

  try {
    gameStateManager.update();
    gameStateManager.draw();
    if (gameStateManager.getCurrentStateName() === "playing") {
      secondsPassed = (timeStamp - oldTimeStamp) / 1000;
      oldTimeStamp = timeStamp;

      fps = Math.round(1 / secondsPassed);

      c.font = "25px Arial";
      c.fillText("FPS: " + fps, 950, 30);
    }
  } catch (error) {
    console.error("Error during game loop:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  gameLoop();
});
