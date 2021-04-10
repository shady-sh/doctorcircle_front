import axios from "axios";

class ConferenceQnaModel {
  constructor(
    authHeader,
    conferenceId,
    conferenceInquiryId,
    conferenceInquiryReplyId
  ) {
    this.inquiryList = axios
      .get(`/api/conferences/${conferenceId}/inquiries`, authHeader)
      .then((res) => {
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    this.inquiryInfo =
      conferenceInquiryId &&
      axios
        .get(
          `/api/conferences/${conferenceId}/inquiries/${conferenceInquiryId}`,
          authHeader
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    this.inquiryReplyInfo =
      conferenceInquiryId &&
      conferenceInquiryReplyId &&
      axios
        .get(
          `/api/conferences/${conferenceId}/inquiries/${conferenceInquiryId}/replies/${conferenceInquiryReplyId}`,
          authHeader
        )
        .then((res) => {
          return Promise.resolve(res.data);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
  }
  getConferenceInquiryList() {
    return this.inquiryList;
  }

  getConferenceInquiryInfo() {
    return this.inquiryInfo;
  }

  getConferenceInquiryReplyInfo() {
    return this.inquiryReplyInfo;
  }
}

export default ConferenceQnaModel;
