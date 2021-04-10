import { useState } from "react";
import WelcomeModel from "../model/Welcome.model";
import Welcome from "../view/Welcome";

const WelcomeContainer = () => {
  const welcomeModel = new WelcomeModel();
  const [slideItems] = useState(welcomeModel.getSlideItems());

  return <Welcome slideItems={slideItems} />;
};

export default WelcomeContainer;
