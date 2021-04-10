import { useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import LayerPopup from "../components/LayerPopup";
import { getToday } from "../Formatter/DateFormatter";
import SpeakersModel from "../model/Speakers.model";
import Speakers from "../view/Speakers";

const SpeakersContainer = ({ history }) => {
  const speakersModel = new SpeakersModel();
  const [speakerLists] = useState(speakersModel.getSpeakerList());
  const [selectedDate, setSelectedDate] = useState(getToday());
  const [isLeader, setIsLeader] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [hospital, setHospital] = useState("");

  const layerPopupRef = useRef();

  const currentDate = (data) => {
    setSelectedDate(data);
  };

  const onChangeLeader = (val) => setIsLeader(val);
  const onChangeName = (val) => setName(val);
  const onChangePosition = (val) => setPosition(val);
  const onChangeHospital = (val) => setHospital(val);
  const layerPopupToggle = () => layerPopupRef.current.toggle();

  return (
    <>
      <Speakers
        speakerLists={speakerLists}
        selectDate={currentDate}
        setIsLeader={onChangeLeader}
        setName={onChangeName}
        setPosition={onChangePosition}
        setHospital={onChangeHospital}
        layerPopupToggle={() => layerPopupToggle()}
      />
      <LayerPopup
        ref={layerPopupRef}
        name={name}
        position={position}
        hospital={hospital}
        isLeader={isLeader}
      />
    </>
  );
};

export default withRouter(SpeakersContainer);
