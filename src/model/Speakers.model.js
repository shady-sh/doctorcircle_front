class SpeakersModel {
  constructor() {
    this.speakerLists = [
      {
        isLeader: true,
        uri: "speaker_01_thumb.jpg",
        name: "Eduardo Marban",
        position: "Arrhythmia",
        hospital: "Cedars-Sinai Medical Center, USA",
      },
      {
        uri: "speaker_02_thumb.jpg",
        name: "Jonathan Lindner",
        position: "Vascular",
        hospital: "Oregon Health and Science University, USA",
      },
      {
        uri: "speaker_03_thumb.jpg",
        name: "Julian Chun",
        position: "Cardiometabolic Syndrome",
        hospital: "Cardioangiologisches Centrum Bethanien, Germany",
      },
      {
        uri: "speaker_04_thumb.jpg",
        name: "Gi Hoon Son",
        position: "Cardiometabolic Syndrome",
        hospital: "Daegu Gyeongbuk Institute of Science and Technology, Korea",
      },
      {
        uri: "speaker_05_thumb.jpg",
        name: "Ho Chul Kang",
        position: "Cardiometabolic Syndrome",
        hospital: "Ajou University School of Medicine, Korea",
      },
      {
        uri: "speaker_06_thumb.jpg",
        name: "Young Min Cho",
        position: "Cardiometabolic Syndrome",
        hospital: "Seoul National University, Korea",
      },
      {
        uri: "speaker_07_thumb.jpg",
        name: "Michael Oher",
        position: "Cardiometabolic Syndrome",
        hospital: "Kyungpook National University, Korea",
      },
    ];
  }
  getSpeakerList() {
    return this.speakerLists;
  }
}

export default SpeakersModel;
