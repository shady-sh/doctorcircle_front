import { useState, useEffect } from "react";
import dateformat from "dateformat";
import MyPage from "../../../components/MyPage";
import { QnaPost } from "../../../components/Post";

const QnaView = ({ location, history }) => {
  const {
    name,
    topic,
    title,
    createdAt,
    content,
    isComplete,
    reply,
  } = location.state;
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [replyInfo, setReplyInfo] = useState();
  const constructor = () => {
    if (!constructorHasRun) {
      setConstructorHasRun(true);
      // const conferenceQnaModel = new ConferenceQnaModel(
      //   authHeader,
      //   conferenceInquiryId,
      //   conferenceInquiryId
      // );
      // conferenceQnaModel.getConferenceInquiryReplyInfo().then((res) => {
      //   setReplyInfo(res);
      //   console.log(res);
      // });
    }
  };
  if (isComplete) constructor();

  return (
    <MyPage
      title="1:1 Inquiry"
      element={
        <QnaPost
          subject={`[${topic}] ${title}`}
          name={name}
          date={createdAt}
          userDesc={content}
          isComplete={isComplete}
          adminDate={reply && dateformat(reply.createdAt, "yyyy. mm. dd")}
          adminDesc={reply && reply.content}
          files={reply && reply.file}
          clickToNextAction={() => {
            history.push("/mypage/private/qna");
          }}
        />
      }
    />
  );
};

export default QnaView;
