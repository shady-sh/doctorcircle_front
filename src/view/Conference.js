import { Swiper, SwiperSlide } from "swiper/react";
import dateformat from "dateformat";
import SwiperCore, { Navigation, Autoplay, Pagination } from "swiper/core";
import Header from "../components/Header";

// 메인페이지 부분 (홈 화면)
// 경로: /Home
SwiperCore.use([Navigation, Autoplay, Pagination]);

const Conference = ({
  speakers,
  menuBoxItems,
  clickToHistoryPush,
  mainImg,
  noticeList,
  partners,
  smallMobile,
}) => {
  let count = 0;
  return (
    <Header
      element={
        <>
          <div className="mainArea">
            <div
              className="section01"
              style={{
                backgroundImage: `url(${
                  mainImg ? mainImg : "/img/main_bg_section1.jpg"
                })`,
              }}
            >
              <div className="center">
                <div className="menuBox">
                  {menuBoxItems.map((v, i) => {
                    return (
                      <a
                        href=""
                        onClick={(e) => clickToHistoryPush(e, `/${v}`)}
                        key={i}
                      >
                        <span className={`icon icon0${i + 1}`} />
                        <p>{v}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <section className="section02">
              <div className="center">
                <div className="section_title">Speakers</div>
                <div className="section_subTitle">
                  우리 클리닉을 이끌고있는 전문 의사 팀!{" "}
                  <br className="m_only" />
                  우리 직원을 만나고 다음 문제를 위해 우리를 방문하십시오!
                </div>
                <div className="swiper_speakers">
                  <Swiper
                    breakpoints={{
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                      },
                      1024: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                      },
                    }}
                    navigation={{
                      nextEl: ".swiper-button-next",
                      prevEl: ".swiper-button-prev",
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ el: ".swiper-pagination", clickable: true }}
                  >
                    {speakers &&
                      speakers.map((v, i) => {
                        const { profile, name, department, hospital } = v;
                        return (
                          <SwiperSlide key={i}>
                            <div
                              className="imgBox"
                              style={{
                                width: "280px",
                                overflow: "hidden",
                                paddingLeft: "20px",
                              }}
                            >
                              <img src={profile} style={{ width: "240px" }} />
                            </div>
                            <div className="textBox">
                              <div className="name">{name}</div>
                              <div className="position">{department}</div>
                              <div className="hospital">{hospital}</div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </Swiper>
                  <div className="swiper-pagination m_only" />
                  <div className="swiper-button-prev button" />
                  <div className="swiper-button-next button" />
                </div>
                <a
                  href=""
                  onClick={(e) => clickToHistoryPush(e, "/speakers")}
                  className="allviewBtn"
                >
                  전체보기
                </a>
              </div>
            </section>

            <section className="section03">
              {/* <div className="center">
                <div className="section_title">Oversea Paper Service</div>
                <div className="section_subTitle">
                  A.P. Moller-Maersk는 다음과 같은 솔루션을{" "}
                  <br className="m_only" />
                  개발하고 있습니다.
                  <br />
                  공급망의 한쪽 끝에서 다른 쪽 끝까지 <br className="m_only" />
                  고객의 요구를 충족합니다.
                </div>
                <div className="m_scroll">
                  <ul className="paper_list" style={{ width: "1200px" }}>
                    <li>
                      <figure>
                        <img src="/img/paper_blue.png" />
                        <span>EBSCO</span>
                      </figure>
                      <div className="textBox">
                        <div className="text01">EBSCO</div>
                        <div className="text02">Behavioral medicine</div>
                      </div>
                      <a href="" className="viewBtn">
                        자세히 보기 <img src="/img/icon_right.png" />
                      </a>
                    </li>
                    <li>
                      <figure>
                        <img src="/img/paper_red.png" />
                        <span>Pubmed</span>
                      </figure>
                      <div className="textBox">
                        <div className="text01">Pubmed</div>
                        <div className="text02">Coronavirus (COVID-19)</div>
                      </div>
                      <a href="" className="viewBtn">
                        자세히 보기 <img src="/img/icon_right.png" />
                      </a>
                    </li>
                    <li>
                      <figure>
                        <img src="/img/paper_orange.png" />
                        <span>
                          DynaMed
                          <br />
                          Plus
                        </span>
                      </figure>
                      <div className="textBox">
                        <div className="text01">DynaMedPlus</div>
                        <div className="text02">Behavioral medicine</div>
                      </div>
                      <a href="" className="viewBtn">
                        자세히 보기 <img src="/img/icon_right.png" />
                      </a>
                    </li>
                    <li>
                      <figure>
                        <img src="/img/paper_green.png" />
                        <span>JSTOR</span>
                      </figure>
                      <div className="textBox">
                        <div className="text01">JSTOR</div>
                        <div className="text02">Coronavirus (COVID-19)</div>
                      </div>
                      <a href="" className="viewBtn">
                        자세히 보기 <img src="/img/icon_right.png" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
              <div className="center">
                <div className="section_title">Notice &amp; News</div>
                <ul className="list">
                  {noticeList &&
                    noticeList.map((v, i) => {
                      count++;
                      if (count <= 3)
                        return (
                          <li
                            key={i}
                            className="cursor"
                            onClick={(e) =>
                              clickToHistoryPush(
                                e,
                                `/mypage/notify_view/${v.conferenceNoticeId}`
                              )
                            }
                          >
                            <div className="date">
                              <p>{dateformat(v.createdAt, "dd")}</p>
                              {smallMobile
                                ? dateformat(v.createdAt, "yyyy. mm. dd")
                                : dateformat(v.createdAt, "yyyy. mm")}
                            </div>
                            <div className="subject">
                              <div className="text01">
                                <span className="cate">공지</span>
                                {v.title}
                              </div>
                              <div className="text02">{v.content}</div>
                            </div>
                            <a href="" className="viewBtn">
                              자세히 보기 <img src="/img/icon_right.png" />
                            </a>
                          </li>
                        );
                    })}
                </ul>
                <a
                  href=""
                  className="allviewBtn"
                  onClick={(e) => clickToHistoryPush(e, "/mypage/notify")}
                >
                  전체보기
                </a>
              </div>
              <img src="/img/deco1.png" className="deco1" />
              <img src="/img/deco2.png" className="deco2" />
            </section>
            <section className="section05">
              <div className="center">
                <div className="section_title">Partners</div>
                <div className="partners_list">
                  {partners &&
                    partners.map((v, i) => {
                      return <img key={i} src={v.company.logo} />;
                    })}
                </div>
              </div>
            </section>
          </div>
        </>
      }
    />
  );
};

export default Conference;
