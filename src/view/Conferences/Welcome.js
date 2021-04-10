import { withRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper/core";
import Header from "../../components/Header";
import Banner from "../../components/Banner";
import WelcomeModel from "../../model/Welcome.model";
import { useEffect, useState } from "react";
import ConferenceWelcomeModel from "../../model/Conference/Welcome.model";
import { authHeader } from "../../services/auth-header";
import ErrorPage from "../ErrorPage";
import axios from "axios";
import { openInNewTab } from "../../components/OpenNewTab";
import Loading from "../../components/Loading";

// Welcome 페이지
// 경로: /Welcome
SwiperCore.use([Navigation, Autoplay, Pagination]);

const ConferenceWelcome = ({ match }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [slideItems, setSlideItems] = useState();
  const [conferenceWelcome, setConferenceWelcome] = useState();
  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        setLoading(true);
        setError(null);
        setName(null);
        setSlideItems(null);
        setConferenceWelcome(null);
        const welcomeModel = new WelcomeModel();
        const conferenceWelcomeModel = new ConferenceWelcomeModel(
          1,
          1,
          authHeader
        );
        await conferenceWelcomeModel
          .getWelcomeInformation()
          .then((res) => setConferenceWelcome(res));
        await setSlideItems(welcomeModel.getSlideItems());
        await axios
          .get(`/api/conferences/1`)
          .then(async (res) => setName(res.data.title));
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchWelcome();
  }, []);

  if (loading)
    return (
      <Header
        element={
          <div className="subArea">
            <Banner title="Welcome" />
            <div className="center">
              <Loading />
            </div>
          </div>
        }
      />
    );

  if (error) return <ErrorPage />;

  return (
    <Header
      element={
        <div className="subArea">
          <Banner title="Welcome" />
          <div className="welcome_text">
            <div className="center">
              <div className="text01">
                {conferenceWelcome && conferenceWelcome.welcomeTitle}
              </div>
              <div className="text02">
                {conferenceWelcome && conferenceWelcome.welcomeContent}
              </div>
            </div>
          </div>

          <div className="swiper_welcome">
            <div className="imgBox">
              <iframe
                className="swiper-slide"
                src={conferenceWelcome && conferenceWelcome.promotionVideoUrl}
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="textBox">
              <div className="absBox">
                <div className="text01">{name && name}</div>
                <div className="text02">
                  {conferenceWelcome && conferenceWelcome.promotionTitle}
                </div>
                <div className="text03">
                  {conferenceWelcome && conferenceWelcome.promotionContent}
                </div>
              </div>
              <div className="swiper-pagination ml-1" />
            </div>
          </div>

          <div className="introduce">
            <div className="center">
              <div className="imgBox">
                {conferenceWelcome && (
                  <img src={conferenceWelcome.societyImage} />
                )}
              </div>
              <div className="textBox">
                <div className="text01">
                  {conferenceWelcome && conferenceWelcome.societyTitle}
                </div>
                <div className="text02">
                  {conferenceWelcome && conferenceWelcome.societyContent}
                </div>
              </div>
            </div>
          </div>

          <div className="bottom_text">
            <div className="center">
              <div className="text01">
                {conferenceWelcome && conferenceWelcome.finishTitle}
              </div>
              <div className="text02">
                {conferenceWelcome && conferenceWelcome.finishContent}
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default withRouter(ConferenceWelcome);
