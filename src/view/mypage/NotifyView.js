import { useEffect, useState } from "react";
import dateformat from "dateformat";
import MyPage from "../../components/MyPage";
import Post from "../../components/Post";
import ConferenceNoticeModel from "../../model/Conference/Notice.model";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const NotifyView = ({ history, match }) => {
  const { conferenceNoticeId } = match.params;
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [notice, setNotice] = useState();

  const constructor = async () => {
    if (!constructorHasRun) {
      setConstructorHasRun(true);
      const conferenceNoticeModel = new ConferenceNoticeModel(
        1,
        conferenceNoticeId
      );
      conferenceNoticeModel.getNoticeInfo().then((res) => setNotice(res));
    }
  };
  constructor();

  return (
    <MyPage
      title="Notice"
      element={
        notice && (
          <Post
            subject={notice.title}
            name="관리자"
            date={dateformat(notice.createdAt, "yyyy. mm. dd")}
            views={notice.viewCount}
            desc={notice.content}
            // desc={draftToHtml(convertToRaw(notice.content))}
            files={notice.files}
            clickToNextAction={() => {
              history.push("/mypage/notify");
            }}
          />
        )
      }
    />
  );
};

export default NotifyView;
