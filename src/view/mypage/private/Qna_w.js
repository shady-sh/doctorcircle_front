import axios from "axios";
import { useState } from "react";
import MyPage from "../../../components/MyPage";
import { authHeader } from "../../../services/auth-header";

const types = ["회원정보", "이수시간(평점)", "이벤트", "기타"];

const Qna_w = ({ match, history }) => {
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const onChangeType = (e) => setType(e.target.value);
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeDesc = (e) => setDesc(e.target.value);

  const clickToCancel = (e) => {
    e.preventDefault();
    history.push("/mypage/private/qna");
  };

  const clickToSubmit = (e) => {
    e.preventDefault();
    if (types.includes(type) && title && desc) {
      const body = { title, topic: type, content: desc };
      axios
        .post(`/api/conferences/1/inquiries`, body, authHeader)
        .then(() => {
          alert("문의가 등록되었습니다");
          history.push(`/mypage/private/qna`);
        })
        .catch((err) => alert(err.response.data.error.message));
    }
  };

  return (
    <MyPage
      title="1:1 Inquiry"
      element={
        <div className="subMain mypage">
          <div className="center">
            <div className="qna_title">1:1 문의하기</div>
            <div className="mypage_table">
              <table className="tb01">
                <tr>
                  <th>문의유형</th>
                  <td>
                    <div className="selectBox">
                      <select onChange={onChangeType}>
                        <option value="">문의유형을 선택해주세요</option>
                        {types.map((v, i) => {
                          return <option key={i}>{v}</option>;
                        })}
                      </select>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>제목</th>
                  <td>
                    <div className="inputBox">
                      <input
                        type="textarea"
                        placeholder="제목을 입력해주세요"
                        value={title}
                        onChange={onChangeTitle}
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td>
                    <div className="textBox">
                      <textarea
                        placeholder="내용을 입력해주세요"
                        value={desc}
                        onChange={onChangeDesc}
                      ></textarea>
                    </div>
                  </td>
                </tr>
              </table>
            </div>

            <div className="bottomBtn">
              <a href="" onClick={clickToSubmit}>
                문의하기
              </a>
              <a href="" onClick={clickToCancel} className="cancel">
                취소
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Qna_w;
