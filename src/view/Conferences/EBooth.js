import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper/core";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import { EBoothPopup, Popup } from "../../components/Popup";
import ErrorPage from "../ErrorPage";
import { ConferenceEBoothEventPopup } from "../../components/Conference/Popup";
import ConferenceEBoothModel from "../../model/Conference/EBooth.model";
import { useMediaQuery } from "react-responsive";

SwiperCore.use([Navigation, Autoplay, Pagination]);

export const ConferenceEBooth = ({ match }) => {
  const { t } = useTranslation();
  const eBoothEventPopupRef = useRef();
  const eBoothPopup = useRef([]);
  const [selectedTab, setSelectedTab] = useState("DIAMOND");
  const [eBoothList, setEBoothList] = useState();
  const [diamond, setDiamond] = useState(null);
  const [platinum, setPlatinum] = useState(null);

  const isPC = useMediaQuery({ query: "(min-width:602px)" });

  useEffect(() => {
    const fetchEBooth = () => {
      const conferenceEBoothModel = new ConferenceEBoothModel();
      conferenceEBoothModel.getConferenceEboothList(1).then((res) => {
        setEBoothList(res.conferenceEbooths);
      });
    };
    fetchEBooth();
  }, []);

  useEffect(() => {
    const fetchSwiper = async () => {
      if (eBoothList) {
        const dia = [];
        const pla = [];
        await eBoothList.map((v) => {
          if (v.tier === "diamond") {
            dia.push(v);
          } else if (v.tier === "platinum") {
            pla.push(v);
          }
        });
        setDiamond(dia);
        setPlatinum(pla);
      }
    };
    fetchSwiper();
  }, [eBoothList]);

  const handleOpenRoom = (e, id) => {
    e.preventDefault();
    eBoothPopup.current[id].toggleMenu();
  };

  const eBoothEventParticipation = useRef();
  const eBoothEventAlreadyParticipation = useRef();

  const onChangeSelectedTab = (e, name, id) => {
    e.preventDefault();
    setSelectedTab(name);
    const offset = $(`#grade0${id}`).offset();
    $("html, body").animate({ scrollTop: offset.top }, 500);
  };

  const openEventPopup = (e) => {
    e.preventDefault();
    eBoothEventPopupRef.current.toggleMenu();
  };

  const logoStyle = isPC
    ? {
        width: "180px",
        height: "64px",
        border: "1px solid rgb(225,225,225)",
      }
    : { width: "168px", height: "60px", border: "1px solid rgb(225,225,225)" };

  // E-booth 슬라이드
  try {
    return (
      <>
        <Header
          element={
            <div className="subArea">
              <div className="eBooth_titleBox">
                <div className="center">
                  <div className="swiper_eBooth">
                    <Swiper
                      direction="horizontal"
                      slidesPerView={2}
                      spaceBetween={20}
                      simulateTouch={true}
                      navigation={{
                        nextEl: ".swiper_eBooth .swiper-button-next",
                        prevEl: ".swiper_eBooth .swiper-button-prev",
                      }}
                      pagination={{
                        el: ".swiper_eBooth .swiper-pagination",
                        clickable: true,
                      }}
                      loop={true}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      breakpoints={{
                        1024: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        500: {
                          slidesPerView: 1,
                          spaceBetween: 20,
                        },
                      }}
                    >
                      {diamond &&
                        diamond.map((v, i) => {
                          return (
                            <SwiperSlide className="cursor-pointer" key={i}>
                              <a
                                href=""
                                onClick={(e) =>
                                  handleOpenRoom(e, v.conferenceEboothId)
                                }
                              >
                                <img src={v.image[0]} />
                              </a>
                            </SwiperSlide>
                          );
                        })}
                      {platinum &&
                        platinum.map((v, i) => {
                          return (
                            <SwiperSlide className="cursor-pointer" key={i}>
                              <a
                                href=""
                                onClick={(e) =>
                                  handleOpenRoom(e, v.conferenceEboothId)
                                }
                              >
                                <img src={v.image[0]} />
                              </a>
                            </SwiperSlide>
                          );
                        })}
                    </Swiper>
                    <div className="swiper-pagination" />
                    <div className="swiper-button-prev button" />
                    <div className="swiper-button-next button" />
                  </div>
                  <div className="tabBox">
                    {["DIAMOND", "PLATUNUM", "GOLD", "SILVER"].map((v, i) => {
                      return (
                        <a
                          key={i}
                          href=""
                          onClick={(e) => {
                            onChangeSelectedTab(e, v, i + 1);
                          }}
                          className={selectedTab == v ? "on" : null}
                        >
                          {v}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="subMain eBooth">
                <div className="center">
                  <a
                    href="javascript:layer_popup_open('popup_eBooth_event');"
                    className="eventBtn"
                    onClick={openEventPopup}
                  >
                    <img src="/img/icon_event.png" />
                    <span>E-Booth 이벤트</span>
                  </a>
                  <ul className="partners_list">
                    <li id="grade01">
                      <div
                        className="grade"
                        style={{ borderBottom: "2px solid #e32e57" }}
                      >
                        <img src="/img/icon_diamond.png" />
                        <span>DIAMOND</span>
                      </div>
                      <div className="partners">
                        {eBoothList &&
                          eBoothList.map((v, i) => {
                            if (v.tier === "diamond") {
                              return (
                                <a
                                  href=""
                                  onClick={(e) =>
                                    handleOpenRoom(e, v.conferenceEboothId)
                                  }
                                  key={i}
                                >
                                  <img style={logoStyle} src={v.company.logo} />
                                </a>
                              );
                            }
                          })}
                      </div>
                    </li>
                    <li id="grade02">
                      <div
                        className="grade"
                        style={{ borderBottom: "2px solid #aebbc5" }}
                      >
                        <img src="/img/icon_platunum.png" />
                        <span>PLATUNUM</span>
                      </div>
                      <div className="partners">
                        {eBoothList &&
                          eBoothList.map((v, i) => {
                            if (v.tier === "platinum")
                              return (
                                <a
                                  href=""
                                  onClick={(e) =>
                                    handleOpenRoom(e, v.conferenceEboothId)
                                  }
                                  key={i}
                                >
                                  <img style={logoStyle} src={v.company.logo} />
                                </a>
                              );
                          })}
                      </div>
                    </li>
                    <li id="grade03">
                      <div
                        className="grade"
                        style={{ borderBottom: "2px solid #fea71a" }}
                      >
                        <img src="/img/icon_gold.png" />
                        <span>GOLD</span>
                      </div>
                      <div className="partners">
                        {eBoothList &&
                          eBoothList.map((v, i) => {
                            if (v.tier === "gold")
                              return (
                                <a
                                  href=""
                                  onClick={(e) =>
                                    handleOpenRoom(e, v.conferenceEboothId)
                                  }
                                  key={i}
                                >
                                  <img style={logoStyle} src={v.company.logo} />
                                </a>
                              );
                          })}
                      </div>
                    </li>
                    <li id="grade04">
                      <div
                        className="grade"
                        style={{ borderBottom: "2px solid #7e7e7e" }}
                      >
                        <img src="/img/icon_silver.png" />
                        <span>SILVER</span>
                      </div>
                      <div className="partners">
                        {eBoothList &&
                          eBoothList.map((v, i) => {
                            if (v.tier === "silver")
                              return (
                                <a
                                  href=""
                                  onClick={(e) =>
                                    handleOpenRoom(e, v.conferenceEboothId)
                                  }
                                  key={i}
                                >
                                  <img style={logoStyle} src={v.company.logo} />
                                </a>
                              );
                          })}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          }
        />
        <ConferenceEBoothEventPopup
          title="[E-Booth 스탬프 이벤트]"
          desc="E-booth 참여하시고, 스탬프를 찍어주세요!"
          joinCompany={eBoothList}
          ref={eBoothEventPopupRef}
        />
        {eBoothList &&
          eBoothList.map((v, i) => {
            return (
              <EBoothPopup
                key={i}
                ref={(el) => (eBoothPopup.current[v.conferenceEboothId] = el)}
                booth={v}
              />
            );
          })}
        <Popup ref={eBoothEventParticipation} desc={t("eBooth_participate")} />
        <Popup
          ref={eBoothEventAlreadyParticipation}
          desc={t("eBooth_alreadyParticipate")}
        />
      </>
    );
  } catch (e) {
    return <ErrorPage />;
  }
};
