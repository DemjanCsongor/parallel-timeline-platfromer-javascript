import SilverCoin from "../objects/items/coins/SilverCoin.js";
import GoldenCoin from "../objects/items/coins/GoldenCoin.js";
import Gem from "../objects/items/coins/Gem.js";

class CoinFactory {
  createCoin(type, options) {
    let coin;
    switch (type) {
      case "gem":
        coin = new Gem(options);
        break;
      case "golden":
        coin = new GoldenCoin(options);
        break;
      case "silver":
        coin = new SilverCoin(options);
        break;
      default:
        coin = new SilverCoin(options);
        break;
    }
    return coin;
  }
}

export default CoinFactory;
