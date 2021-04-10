import axios from "axios";

class HomeModel {
  constructor() {
    this.partnerImg = [
      "biot", // 파일은 꼭 jpg이어야 하며 public > img 경로에 넣어주세요
      "mirabel",
      "st1",
      "elysium",
      "koibig",
      "amgen",
      "samjin",
      "kyungbo",
      "boryung",
      "samsung",
      "ildong",
      "sanofi",
    ];
    this.menuBoxItems = ["Speakers", "Program", "Live", "Abstracts", "E-Booth"];
    this.speakers = [
      {
        name: "Eduardo Marban",
        position: "Arrhythmia",
        hospital: "Cedars-Sinai Medical Center, USA",
        img: "speaker_01.jpg",
      },
      {
        name: "Jonathan Lindner",
        position: "Vascular",
        hospital: "Oregon Health and Science University, USA",
        img: "speaker_02.jpg",
      },
      {
        name: "Julian Chun",
        position: "Arrhythmia",
        hospital: "Cardioangiologisches Centrum Bethanien, Germany",
        img: "speaker_03.jpg",
      },
      {
        name: "Young Min Cho",
        position: "Cardiometabolic Syndrome",
        hospital: "Seoul National University, Korea",
        img: "speaker_04.jpg",
      },
      {
        name: "Eduardo Marban",
        position: "Arrhythmia",
        hospital: "Cedars-Sinai Medical Center, USA",
        img: "speaker_01.jpg",
      },
      {
        name: "Jonathan Lindner",
        position: "Vascular",
        hospital: "Oregon Health and Science University, USA",
        img: "speaker_02.jpg",
      },
      {
        name: "Julian Chun",
        position: "Arrhythmia",
        hospital: "Cardioangiologisches Centrum Bethanien, Germany",
        img: "speaker_03.jpg",
      },
      {
        name: "Young Min Cho",
        position: "Cardiometabolic Syndrome",
        hospital: "Seoul National University, Korea",
        img: "speaker_04.jpg",
      },
    ];
  }
  getPartnerImg() {
    return this.partnerImg;
  }

  getMenuboxes() {
    return this.menuBoxItems;
  }

  getSpeakers() {
    return this.speakers;
  }
}

export default HomeModel;
