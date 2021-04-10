import { Button } from "@material-ui/core";
import "../style/errorpage.scss";

const btnStyle = {
  width: "222px",
  height: "58px",
  backgroundColor: "#319fdc",
  color: "#fff",
};

const ErrorPage = () => {
  return (
    <div className="error-page">
      <div className="centered">
        <img className="mb-4 pb-3" src="/img/icon_error.png" />
        <h4>일시적인 시스템 장애로 인하여</h4>
        <h4>서비스 접속이 원활하지 않습니다.</h4>
        <div className="error-desc">
          <p>서비스 이용에 불편을 드려 죄송합니다.</p>
          <p>
            동시에 접속하는 이용자 수가 많거나 인터넷 네트워크 상태가 불안정하여
            현재 서비스 접속이 불가합니다.
          </p>
          <p>새로고침(F5) 또는 네트워크(방화벽)환경을 확인해주세요.</p>
          <p className="mb-4 pb-3">
            최신 브라우저 이용 및 무선보다 유선 네트워크를 이용해주세요.
          </p>
          <h4>문의 : 1522-0209</h4>
        </div>
        <Button style={btnStyle} onClick={() => window.location.reload()}>
          새로고침
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
