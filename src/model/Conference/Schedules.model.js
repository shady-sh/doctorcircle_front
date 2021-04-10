import axios from "axios";

class ConferenceScheduleModel {
  constructor(conferenceId, conferenceScheduleId, conferenceScheduleRoomId) {
    this.scheduleList = axios
      .get(`/api/conferences/${conferenceId}/schedules`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    this.scheduleRoom =
      conferenceScheduleId &&
      conferenceScheduleRoomId &&
      axios
        .get(
          `/api/conferences/${conferenceId}/schedules/${conferenceScheduleId}/rooms/${conferenceScheduleRoomId}`
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
  }

  getScheduleList() {
    return this.scheduleList;
  }
  getScheduleRoomInformation() {
    return this.scheduleRoom;
  }
}

export default ConferenceScheduleModel;
