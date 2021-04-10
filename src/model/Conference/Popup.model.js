import axios from "axios";

class ConferencePopupModel {
  constructor(conferenceId, conferencePopupId) {
    this.popupList = axios
      .get(`/api/conferences/${conferenceId}/popups`)
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    this.popupInformation =
      conferencePopupId &&
      axios
        .get(`/api/conferneces/${conferenceId}/popups/${conferencePopupId}`)
        .then(res => {
          return Promise.resolve(res.data);
        })
        .catch(err => {
          return Promise.reject(err);
        });
  }

  getPopupList() {
    return this.popupList;
  }
  getPopupInformation() {
    return this.popupInformation;
  }
}

export default ConferencePopupModel;
