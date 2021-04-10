import axios from "axios";

class WelcomeModel {
  constructor() {
    this.slideItems = ["sample_img.jpg", "sample_img.jpg", "sample_img.jpg"];
  }
  getSlideItems() {
    return this.slideItems;
  }
}

export default WelcomeModel;
