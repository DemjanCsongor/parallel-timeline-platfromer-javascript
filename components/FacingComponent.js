class FacingComponent {
    constructor(initialFacing) {
      this.facing = initialFacing;
    }
  
    setFacing(facing) {
      this.facing = facing;
    }
  
    flipContext(c, x) {
      if (this.facing === "left") {
        c.save();
        c.scale(-1, 1);
        c.translate((-x * 2) + 2, 0);
      }
    }
  
    restoreContext(c) {
      if (this.facing === "left") {
        c.restore();
      }
    }
  }
  
  export default FacingComponent;
  