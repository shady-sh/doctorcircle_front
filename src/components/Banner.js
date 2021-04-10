import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ConferenceModel from "../model/Conferences.model";
import Loading from "./Loading";
import MyPage from "./MyPage";

const Banner = ({ title, history }) => {
  const [subImage, setSubImage] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setSubImage(null);
      setLoading(true);
      setError(null);
      const conferenceModel = new ConferenceModel(1);
      conferenceModel.getConferenceInformation().then((res) => {
        setSubImage(res.subImage[0]);
      });
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="titleBox">
        <div className="center">
          <div className="textBox">
            <Loading />
          </div>
        </div>
      </div>
    );

  if (error) return <MyPage />;

  return (
    <div
      className="titleBox"
      style={{
        backgroundImage: subImage ? `url(${subImage})` : "url(/img/sub_bg.jpg)",
      }}
    >
      <div className="center">
        <div className="textBox">
          <div className="title">{title}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Banner);
