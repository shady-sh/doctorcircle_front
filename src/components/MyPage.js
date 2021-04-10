import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import ConferenceBannerModel from "../model/Conference/Banner.model";
import ConferenceModel from "../model/Conferences.model";
import Header from "./Header";
import MainMenuList from "./MainMenuList";

const subMenuList = [
  { path: "/mypage/private/userInfo", name: "개인정보" },
  { path: "/mypage/private/interestedlist/program", name: "관심리스트" },
  { path: "/mypage/private/participationhistory", name: "참여내역" },
  { path: "/mypage/private/qna", name: "1:1문의" },
  { path: "/mypage/notify", name: "공지사항" },
];

const MyPage = ({ location, history, element, title }) => {
  const [subImage, setSubImage] = useState();
  useEffect(() => {
    const conferenceModel = new ConferenceModel(1);
    conferenceModel.getConferenceInformation().then((res) => {
      setSubImage(res.subImage[0]);
    });
  }, []);
  const [currentPage] = useState(location.pathname.toLowerCase());

  const getCurrentPage = () => {
    return currentPage.includes("userinfo")
      ? "개인정보"
      : currentPage.includes("interestedlist")
      ? "관심리스트"
      : currentPage.includes("participationhistory")
      ? "참여내역"
      : currentPage.includes("qna")
      ? "1:1문의"
      : "공지사항";
  };
  return (
    <Header
      element={
        <div className="subArea">
          <div
            className="titleBox"
            style={{
              backgroundImage: subImage
                ? `url(${subImage})`
                : "url(/img/sub_bg.jpg)",
            }}
          >
            <div className="center">
              <div className="textBox">
                <div className="title">{title ? title : "Mypage"}</div>
              </div>
            </div>
          </div>
          {element}
        </div>
      }
    />
  );
};

export default withRouter(MyPage);
