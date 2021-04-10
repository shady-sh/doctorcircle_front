class ProgramModel {
  constructor() {
    this.times = [
      { time: "09:00 - 10:00", pos: 1 },
      { time: "10:00 - 10:20", break: true, desc: "Break Time" },
      { time: "10:20 - 11:20", pos: 2 },
      { time: "11:20 - 11:40", break: true, desc: "Break Time" },
      { time: "11:40 - 12:40", pos: 3 },
      { time: "12:40 - 14:00", break: true, desc: "Intermission" },
      { time: "14:00 - 15:00", pos: 4 },
      { time: "15:40 - 15:20", break: true, desc: "Break Time" },
      { time: "15:20 - 16:20", pos: 5 },
      { time: "16:20 - 16:40", break: true, desc: "Break Time" },
      { time: "16:40 - 17:40", pos: 6 },
    ];

    this.rooms = [
      {
        name: "Room 1",
        subject: "상심실성빈맥, 일차 의료기관에서 진단하고 관리하기",
        moderators: [
          {
            name: "Eduardo Marban",
            hospital: "Cedars-Sinai Medical Center, USA",
          },
          {
            name: "Julian Chun",
            hospital: "Cardioangiologisches Centrum Bethanien, Germany",
          },
          {
            name: "Young Min Cho",
            hospital: "Seoul National University, Korea",
          },
          {
            name: "Kyungwon Kwak",
            hospital: "Kyungpook National University, Korea",
          },
          {
            name: "Jonathan Lindner",
            hospital: "Oregon Health and Science University, USA",
          },
        ],
        items: [
          {
            pos: 1,
            desc:
              "IBS Symposium - Imaging neuronal information processing: From sensation to perception",
            logo: "ildong.jpg",
            speaker: {
              name: "Eduardo Marban",
              position: "Arrhythmia",
              hospital: "Cedars-Sinai Medical Center, USA",
            },
          },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room2",
        items: [
          {
            pos: 1,
            desc:
              "IBS Symposium - Imaging neuronal information processing: From sensation to perception",
          },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room3",
        items: [
          { pos: 1 },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room4",
        items: [
          { pos: 1, desc: "" },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room5",
        items: [
          { pos: 1, desc: "" },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room6",
        items: [
          { pos: 1, desc: "" },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room7",
        items: [
          { pos: 1, desc: "" },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room8",
        items: [
          { pos: 1, desc: "" },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
      {
        name: "Room9",
        items: [
          { pos: 1, desc: "" },
          { pos: 2 },
          { pos: 3 },
          { pos: 4 },
          { pos: 5 },
          { pos: 6 },
        ],
      },
    ];
  }

  getTimes() {
    return this.times;
  }

  getRooms() {
    return this.rooms;
  }
}

export default ProgramModel;
