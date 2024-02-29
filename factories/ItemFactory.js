import CoinFactory from "./CoinFactory.js";
import Heart from "../objects/items/Heart.js";
import Rock from "../objects/items/Rock.js";

class ItemFactory {
  constructor() {
    this.coinFactory = new CoinFactory();
  }

  createItem(type, subtype, options) {
    let item;
    switch (type) {
      case "coin":
        item = this.coinFactory.createCoin(subtype, options);
        break;
      case "heart":
        item = new Heart(options);
        break;
      case "rock":
        item = new Rock(options);
        break;
      default:
        break;
    }
    return item;
  }
}

export default ItemFactory;
