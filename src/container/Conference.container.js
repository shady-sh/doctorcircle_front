import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { PopupConference } from "../components/Popup";
import { compareDate, getToday } from "../Formatter/DateFormatter";
import ConferenceEBoothModel from "../model/Conference/EBooth.model";
import ConferenceNoticeModel from "../model/Conference/Notice.model";
import ConferencePopupModel from "../model/Conference/Popup.model";
import ConferenceSpeakersModel from "../model/Conference/Speakers.model";
import ConferenceModel from "../model/Conferences.model";
import HomeModel from "../model/Home.model";
import { authHeader } from "../services/auth-header";
import { SET_CONFERENCE } from "../store/moduels/types";
import Conference from "../view/Conference";

// 학술대회 메인페이지
const ConferenceContainer = ({ match, history }) => {
  const homeModel = new HomeModel();
  const [conferenceInf, setConferenceInf] = useState();
  const [speakers, setSpeakers] = useState();
  const [noticeList, setNoticeList] = useState();
  const [partnerList, setPartnerList] = useState();
  const [popupList, setPopupList] = useState();
  const [partnerImg] = useState(homeModel.getPartnerImg());
  const [menuBoxItems] = useState(homeModel.getMenuboxes());
  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });
  const smallMobile = useMediaQuery({ query: "(max-width:768px)" });

  useEffect(() => {
    const conferenceModel = new ConferenceModel(1, authHeader);
    const conferenceSpeakersModel = new ConferenceSpeakersModel(1);
    const conferenceNoticeModel = new ConferenceNoticeModel(1);
    const conferenceEBoothModel = new ConferenceEBoothModel();
    const confernecePopupModel = new ConferencePopupModel(1);
    conferenceModel.getConferenceInformation().then((res) => {
      setConferenceInf(res);
    });
    conferenceSpeakersModel.getSpeakerList().then((res) => {
      setSpeakers(res.conferenceSpeakers);
    });
    conferenceNoticeModel
      .getNoticeList()
      .then((res) => setNoticeList(res.conferenceNotices));
    conferenceEBoothModel.getConferenceEboothList(1).then((res) => {
      setPartnerList(res.conferenceEbooths);
    });
    confernecePopupModel.getPopupList().then((res) => {
      setPopupList(res.conferencePopups);
    });
  }, []);

  const clickToHistoryPush = (e, params) => {
    e.preventDefault();
    history.push(params);
  };
  try {
    return (
      <>
        <Conference
          speakers={speakers}
          menuBoxItems={menuBoxItems}
          clickToHistoryPush={clickToHistoryPush}
          mainImg={
            conferenceInf.mainImage && isMobile
              ? conferenceInf.mainImage[0]
              : conferenceInf.mainImage[0]
          }
          noticeList={noticeList && noticeList}
          partners={partnerList && partnerList}
          smallMobile={smallMobile && smallMobile}
        />
        {popupList &&
          popupList.map((v, i) => {
            if (compareDate(v.startAt, v.endAt, getToday()))
              return (
                <PopupConference
                  id={v.conferencePopupId}
                  key={i}
                  popupImg={v.files}
                  url={v.url}
                  isDaily={v.isDaily}
                />
              );
          })}
      </>
    );
  } catch (err) {
    return (
      <Conference
        menuBoxItems={menuBoxItems}
        partnerImg={partnerImg}
        clickToHistoryPush={clickToHistoryPush}
        smallMobile={smallMobile && smallMobile}
      />
    );
  }
};

export default ConferenceContainer;
