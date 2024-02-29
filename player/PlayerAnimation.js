import Sprite from "../core/Sprite.js";
import eventManager from "../core/EventManager.js";

class PlayerAnimation {
  static animationData = {
    Idle: {
      imageSrc: "../../img/pinkMonster/Idle.png",
      frameCount: 4,
      frameBuffer: 6,
    },
    Run: {
      imageSrc: "../../img/pinkMonster/Run.png",
      frameCount: 6,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: "../../img/pinkMonster/Jump.png",
      frameCount: 8,
      frameBuffer: 2,
    },
    DoubleJump: {
      imageSrc: "../../img/pinkMonster/Jump.png",
      frameCount: 8,
      frameBuffer: 15,
    },
    Fall: {
      imageSrc: "../../img/pinkMonster/Jump.png",
      frameCount: 8,
      frameBuffer: 15,
    },
    Throw: {
      imageSrc: "../../img/pinkMonster/Throw.png",
      frameCount: 4,
      frameBuffer: 15,
    },
  };

  constructor({
    position,
    imageSrc,
    frameCount,
    frameBuffer,
    startFrame = 0,
    endFrame = null,
    animations = PlayerAnimation.animationData,
  }) {
    this.position = position;
    this.animations = animations;
    this.sprite = new Sprite({
      position,
      imageSrc,
      frameCount,
      frameBuffer,
      scale: 0.5,
      startFrame,
      endFrame,
    });

    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }

    eventManager.on("MoveRight", this.moveRight.bind(this));
    eventManager.on("MoveLeft", this.moveLeft.bind(this));
    eventManager.on("Jump", this.jump.bind(this));
    eventManager.on("DoubleJump", this.doubleJump.bind(this));
    eventManager.on("Idle", this.idle.bind(this));
    eventManager.on("Fall", this.fall.bind(this));
    eventManager.on("Throw", this.throw.bind(this));
  }

  switchSprite(key, startFrame = 0, endFrame = null) {
    if (this.sprite.image === this.animations[key].image || !this.sprite.loaded)
      return;

    this.sprite.image = this.animations[key].image;
    this.sprite.frameBuffer = this.animations[key].frameBuffer;
    this.sprite.frameCount = this.animations[key].frameCount;

    if (key === "Jump" || key === "DoubleJump" || key === "Fall") {
      this.sprite.currentFrame = startFrame;
      this.sprite.endFrame = endFrame;
    } else {
      this.sprite.currentFrame = 0;
      this.sprite.endFrame = null;
    }
  }

  moveRight() {
    this.sprite.facingComponent.setFacing("right");
    this.switchSprite("Run");
  }

  moveLeft() {
    this.sprite.facingComponent.setFacing("left");
    this.switchSprite("Run");
  }

  jump() {
    this.switchSprite("Jump", 2, 3);
  }

  doubleJump(){
    this.switchSprite("DoubleJump", 4, 5);
  }

  idle() {
    this.switchSprite("Idle");
  }

  fall() {
    this.switchSprite("Fall", 5, 6);
  }

  throw() {
    this.switchSprite("Throw");
  }

  update() {
    this.sprite.updateFrames();
  }

  draw() {
    this.sprite.draw();
  }

  updatePosition(newPosition) {
    this.position = newPosition;
    this.sprite.position = newPosition;
  }
}

export default PlayerAnimation;
