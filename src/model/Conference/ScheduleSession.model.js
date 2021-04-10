import axios from "axios";

class ScheduleSessionModel {
  constructor(conferenceId, conferenceScheduleId, conferenceScheduleSessionId) {
    this.sessionInformation = axios
      .get(
        `/api/conferences/${conferenceId}/schedules/${conferenceScheduleId}/sessions/${conferenceScheduleSessionId}`
      )
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    this.programs = axios
      .get(
        `/api/conferences/${conferenceId}/schedules/${conferenceScheduleId}/sessions/${conferenceScheduleSessionId}/programs`
      )
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  getSessionInformation() {
    return this.sessionInformation;
  }
  getProgramList() {
    return this.programs;
  }
}

export default ScheduleSessionModel;
