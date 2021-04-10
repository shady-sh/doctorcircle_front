import axios from "axios";

class ConferenceFAQModel {
  constructor(conferenceId, conferenceFaqId) {
    this.faqList = axios
      .get(`/api/conferences/${conferenceId}/faqs`)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    this.faqInfo =
      conferenceFaqId &&
      axios
        .get(`/api/conferences/${conferenceId}/faqa/${conferenceFaqId}`)
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
  }

  getFAQLIst() {
    return this.faqList;
  }
  getFAQInfo() {
    return this.faqInfo;
  }
}

export default ConferenceFAQModel;
