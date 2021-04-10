import Loading from "./Loading";

const PopupLoading = () => {
  return (
    <div id="popup_eBooth_event" className="layer_popup">
      <div className="popup_main">
        <a href="" className="closeBtn">
          <img src="/img/icon_close.png" />
        </a>
        <div className="popup_title">
          <Loading />
        </div>
      </div>
    </div>
  );
};

export default PopupLoading;
