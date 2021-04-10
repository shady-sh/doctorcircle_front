import ErrorPage from "./view/ErrorPage";
import FindUserID from "./view/login/FindUserID";
import FindUserPassword from "./view/login/FindUserPassword";
import FoundID from "./view/login/FoundID";
import FoundUserPassword from "./view/login/FoundUserPassword";
import Login from "./view/login/Login";
import Logout from "./view/login/Logout";
import Notify from "./view/mypage/Notify";
import NotifyView from "./view/mypage/NotifyView";
import { InterestList } from "./view/mypage/private/InterestList";
import { ParticipationHistory } from "./view/mypage/private/ParticipationHistory";
import Qna from "./view/mypage/private/Qna";
import QnaView from "./view/mypage/private/QnaView";
import Qna_w from "./view/mypage/private/Qna_w";
import { UserInfo } from "./view/mypage/private/UserInfo";
import ConferenceWelcome from "./view/Conferences/Welcome";
import ConferenceSpeakers from "./view/Conferences/Speakers";
import ConferenceLive from "./view/Conferences/Live/Live";
import ConferenceLiveView from "./view/Conferences/Live/LiveView";
import { ConferenceAbstracts } from "./view/Conferences/Abstracts/Abstracts";
import { ConferenceAbstractsView } from "./view/Conferences/Abstracts/AbstractsView";
import { ConferenceEBooth } from "./view/Conferences/EBooth";
import FAQView from "./view/mypage/FAQ";
import ConferenceSchedules from "./view/Conferences/Schedules";
import ConferenceVODView from "./view/Conferences/VOD/VODView";

export const routeLists = [
  { path: "/error", component: ErrorPage },
  {
    path: "/abstracts",
    component: ConferenceAbstracts,
  },
  {
    path: "/abstractsview/:conferenceAbstractId",
    component: ConferenceAbstractsView,
  },
  { path: "/e-booth", component: ConferenceEBooth },
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  { path: "/finduserid", component: FindUserID },
  { path: "/foundid", component: FoundID },
  {
    path: "/finduserpassword",
    component: FindUserPassword,
  },
  {
    path: "/founduserpassword",
    component: FoundUserPassword,
  },
  { path: "/live", component: ConferenceLive },
  {
    path: "/live_view/:conferenceLiveId",
    component: ConferenceLiveView,
  },
  { path: "/vod_view/:conferenceVodId", component: ConferenceVODView },
  { path: "/program", component: ConferenceSchedules },
  { path: "/speakers", component: ConferenceSpeakers },
  {
    path: "/welcome",
    component: ConferenceWelcome,
  },
  {
    path: "/mypage/private/userinfo",
    component: UserInfo,
  },
  {
    path: "/mypage/private/interestedlist/:name",
    component: InterestList,
  },
  {
    path: "/mypage/private/participationhistory",
    component: ParticipationHistory,
  },
  {
    path: "/mypage/private/qna",
    component: Qna,
  },
  {
    path: "/mypage/private/qna_w",
    component: Qna_w,
  },
  {
    path: "/mypage/private/qna_view",
    component: QnaView,
  },
  { path: "/mypage/notify", component: Notify },
  {
    path: "/mypage/notify_view/:conferenceNoticeId",
    component: NotifyView,
  },
  {
    path: "/mypage/private/faq_view",
    component: FAQView,
  },
];
