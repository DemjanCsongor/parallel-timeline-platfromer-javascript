import BackgroundElement from "../scene/BackgroundElement.js";

class BackgroundElementFactory {
  createBackgroundElement(type, options) {
    let bgElement;
    switch (type) {
      case "tree":
        bgElement = new BackgroundElement({
          ...options,
          imageSrc: "../img/backgroundElements/tree.png",
        });
        break;
      default:
        break;
    }
    return bgElement;
  }
}

export default BackgroundElementFactory;
