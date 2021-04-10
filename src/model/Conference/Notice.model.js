import axios from "axios";

class ConferenceNoticeModel {
  constructor(conferenceId, conferenceNoticeId) {
    this.noticeList = axios
      .get(`/api/conferences/${conferenceId}/notices`)
      .then(async (res) => {
        return Promise.resolve(res.data);
      })
      .catch(async (err) => {
        return Promise.reject(err);
      });
    this.noticeInfo =
      conferenceNoticeId &&
      axios
        .get(`/api/conferences/${conferenceId}/notices/${conferenceNoticeId}`)
        .then(async (res) => {
          return Promise.resolve(res.data);
        })
        .catch(async (err) => {
          return Promise.reject(err);
        });
  }

  getNoticeList() {
    return this.noticeList;
  }

  getNoticeInfo() {
    return this.noticeInfo;
  }
}

export default ConferenceNoticeModel;
