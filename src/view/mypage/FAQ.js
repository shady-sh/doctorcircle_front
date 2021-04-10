import dateformat from "dateformat";
import MyPage from "../../components/MyPage";
import Post from "../../components/Post";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

const FAQView = ({ history, match, location }) => {
  const { title, createdAt, content, files } = location.state;

  return (
    <MyPage
      title="1:1 Inquiry"
      element={
        <Post
          subject={title}
          name="관리자"
          date={dateformat(createdAt, "yyyy. mm. dd")}
          desc={content}
          files={files}
          clickToNextAction={() => {
            history.push("/mypage/private/qna");
          }}
        />
      }
    />
  );
};

export default FAQView;
