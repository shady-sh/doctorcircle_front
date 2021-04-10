import axios from "axios";

class ConferenceEventModel {
  getEventList(conferenceId) {
    return axios
      .get(`/api/conferences/${conferenceId}/events`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  getEventPopupList(conferenceId, conferenceEventId) {
    return axios
      .get(
        `/api/conferences/${conferenceId}/events/${conferenceEventId}/popups`
      )
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  getEventInformation(conferenceId, conferenceEventId) {
    return axios
      .get(`/api/conferences/${conferenceId}/events/${conferenceEventId}`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  getEventEbooths(conferenceId, conferenceEventId, authHeader) {
    return axios
      .get(
        `/api/conferences/${conferenceId}/events/${conferenceEventId}/ebooths`,
        authHeader
      )
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}

export default ConferenceEventModel;
