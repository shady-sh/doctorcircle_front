import axios from "axios";

class ConferenceETestModel {
  constructor(authHeader, conferenceId, conferenceEtestId) {
    this.eTestInformation = axios
      .get(
        `/api/conferences/${conferenceId}/etests/${conferenceEtestId}`,
        authHeader
      )
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
    this.eTestProblems = axios
      .get(
        `/api/conferences/${conferenceId}/etests/${conferenceEtestId}/problems`,
        authHeader
      )
      .then(res => {
        return Promise.resolve(res.data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  getInformation() {
    return this.eTestInformation;
  }
  getProblems() {
    return this.eTestProblems;
  }
}

export default ConferenceETestModel;
