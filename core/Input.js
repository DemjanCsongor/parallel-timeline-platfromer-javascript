class Input {
  constructor() {
    this.keys = {};
    this.justPressed = {};
    this.mousePos = { x: 0, y: 0 };
    this.mouseButtons = { left: false };
    this.justClicked = { left: false };
    this.actionMap = {
      moveRight: ["KeyD"],
      moveLeft: ["KeyA"],
      jump: ["KeyW"],
      throw: ["KeyT"],
      pause: ["KeyP"],
      timeLineRight: ["ArrowRight"],
      timeLineLeft: ["ArrowLeft"],
      timeLineGo: ["Enter"],
    };
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }

  handleKeyDown(event) {
    if (!this.keys[event.code]) {
      this.justPressed[event.code] = true;
    }
    this.keys[event.code] = true;
  }

  handleKeyUp(event) {
    this.keys[event.code] = false;
    this.justPressed[event.code] = false;
  }

  isActionActive(actionName) {
    const keyCodes = this.actionMap[actionName];
    return keyCodes.some((keyCode) => this.keys[keyCode]);
  }

  wasActionPressed(actionName) {
    const keyCodes = this.actionMap[actionName];
    return keyCodes.some((keyCode) => {
      const wasPressed = this.keys[keyCode] && this.justPressed[keyCode];
      this.justPressed[keyCode] = false;
      return wasPressed;
    });
  }

  handleMouseMove(event) {
    this.mousePos.x = event.clientX;
    this.mousePos.y = event.clientY;
  }

  handleMouseDown(event) {
    if (event.button === 0 && !this.justClicked.left) {
      this.mouseButtons.left = true;
      this.justClicked.left = true;
    }
  }

  handleMouseUp(event) {
    if (event.button === 0) {
      this.mouseButtons.left = false;
      this.justClicked.left = false;
    }
  }

  wasMouseButtonPressed(button) {
    if (button === "left") {
      if (this.justClicked.left) {
        this.justClicked.left = false;
        return true;
      }
    }
    return false;
  }

  getMousePosition() {
    return { x: this.mousePos.x, y: this.mousePos.y };
  }
}

const input = new Input();

export default input;
