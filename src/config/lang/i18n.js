import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // 공통
      title: "Title",
      date: "Date",
      status: "Status",
      search: "SEARCH",
      submit: "SUBMIT",
      all: "ALL",
      list: "LIST",
      mypage: "Mypage",
      logout_btn: "Logout",

      // 공통 버튼
      btn_confirm: "OK",
      btn_cancel: "CANCEL",

      // 로그인 액션
      login_success: "You are now logged in!",
      login_notToken: "Access Token doesn't exist",
      logout: "You are now logged out!",

      // 로그인 메인페이지
      login_title: "LOG IN",
      login_text01:
        "The login information has been delivered to the email <br className='m_only' />information you filled in during pre-registration.",
      login_text02: "※ Contact Us: Dr. Ville Conference / T. 1522-0209",
      login_invalidAccount: "ID or password does not match",
      login_duplicatedLogin: "Log out because it is a duplicate login.",
      login_noInformation: "There is information that has not been entered.",
      login_remember: "Remember ID/PW",
      login_findID: "Find ID",
      login_findPW: "Find Password",

      // 아이디 찾기
      findID_title: "FIND ID",
      findID_name: "NAME",
      findID_nameInput: "Type your name",
      findID_mobile: "Mobile Number",
      findID_mobileInput: "Type your Mobile Number",
      findID_btnGetVerify: "SEND NUMBER",
      findID_verifyNum: "Verify Number",
      findID_verifyInput: "Type a Verify Number",
      findID_btnVerify: "VERIFY",
      findID_btnConfirm: "OK",
      findID_sent: "The verify number has been sent",
      findID_success: "You have been successfully verified",
      findID_invalidNumber: "Please enter a valid phone number",
      findID_notMatch: "Invalid verify number",

      // 아이디 찾기 완료
      foundID_title: "ID search completed",
      foundID_text01:
        "This is the ID that matches the information you entered.",
      foundID_btnLogin: "LOG IN",
      foundID_btnFindPW: "Find Password",

      // 비밀번호 찾기
      findPW_title: "FIND PASSWORD",
      findPW_email: "E-mail",
      findPW_emailInput: "Type Your E-mail",
      findPW_mobile: "Mobile Number",
      findPW_mobileInput: "Type Your Mobile Number",
      findPW_btnGetVerify: "SEND NUMBER",
      findPW_verifyNum: "Verify Number",
      findPW_verifyInput: "Type a Verify Number",
      findPW_btnVerify: "VERIFY",
      findPW_btnConfirm: "OK",
      findPW_sent: "The verify number has been sent",
      findPW_invalidNumber: "Invalid number",
      findPW_invalidInf: "Please enter a valid information",
      findPW_invalidInfSub: "Try again",
      findPW_success: "You have been successfully verified",
      findPW_notMatch: "Invalid verify number",
      foundPW_currMatch: "It is the same as the existing password.",

      // 비밀번호 찾기 완료
      foundPW_title: "FIND PASSWORD",
      foundPW_titleNew: "New Password",
      foundPW_reset: "PASSWORD RESET",
      foundPW_newPasswordInput: "Type your New password",
      foundPW_titleConfirm: "Confirm  New Password",
      foundPW_confirmInput: "Type your Confirm new password",
      foundPW_confirm: "OK",
      foundPW_success: "Password change is complete.",
      foundPW_currentPW: "Current Password",
      foundPW_currentPWInput: "Type your Current password",
      foundPW_notMatch: "The password you entered is different",

      //Footer 부분
      footer_address1: "Lotte Castle President 101-dong 1704,",
      footer_address2: "109 Mapo-daero, Mapo-gu, Seoul (right: 04146)",
      footer_businessNum: "Business Number : 229-82-00136",

      // QuickMenu
      quickMenu_notice: "Notice",
      quickMenu_inQuiry: "1:1 Inquiry",

      // Live View
      liveView_time: "Check In Time",
      liveView_hoverText:
        "The participation time will be recorded with the check-in and out time you clicked.",
      liveView_notice1: "If the video is disconnected, please click Refresh F5",
      liveView_notice2:
        "Please participate in the E-Test after the lecture<br/>(Evaluation cannot be completed if not participated)",
      liveView_moveRoom: "MOVE ROOM",
      liveView_leave: "CHECK OUT",
      liveView_videoPop_desc1: "Pleace click the OK button",
      liveView_videoPop_desc2: "and continue to participate",
      liveView_leavePop_desc: "You did not click the Exit button.",
      liveView_leavePop_desc1:
        "You will not be re-entered after the session end time.",
      liveView_leavePop_desc2: "Would you like to check out?",
      liveView_movePop_desc1: "You did not click the Exit button.",
      liveView_movePop_desc2: "Would you like to check out?",

      // Abstracts View
      AbstractsView_addInterestDesc: "Bookmark successfully added.",
      AbstractsView_addInterestDesc2: "Check it out on My Page.",
      AbstractsView_removeInterestDesc: "Bookmark cancelled.",
      AbstractsView_removeInterestDesc2: "",

      // E-booth
      eBooth_participate: "Thank you for your participation.",
      eBooth_alreadyParticipate: "It's already done.",

      // Mypage
      myPage_userInfo: "My profile",
      myPage_bookmark: "BOOKMARK",
      myPage_participation: "Participation record",

      // Mypage - UserInfo
      myPage_userInfo_name: "NAME",
      myPage_userInfo_hospital: "Affiliation",
      myPage_userInfo_license: "License number",
      myPage_userInfo_email: "E-Mail",
      myPage_userInfo_pw: "Password",
      myPage_userInfo_pwInput: "Type your Password",
      myPage_userInfo_pwBtn: "PASSWORD EDIT",
      myPage_userInfo_mobile: "Mobile Number",
      myPage_userInfo_emailPush: "E-Mail Push",
      myPage_userInfo_smsPush: "SMS Push",
      myPage_userInfo_agree: "Agree",
      myPage_userInfo_disAgree: "DisAgree",
      myPage_userInfo_save: "SAVE",

      // Mypage - Bookmark
      myPage_bookmark_date: "Date",
      myPage_bookmark_time: "Time",
      myPage_bookmark_title: "Title",

      // Mypage - Participation record
      myPage_par_totalHour: "Total hour",
      myPage_par_totalM: "minutes",
      myPage_par_totalPoint: "Total Point",
      myPage_par_totalPointNumber: "pt",
      myPage_par_totalPointAlert: "(1 pt = 1 hour)",
      myPage_par_eTest: "E-TEST",
      myPage_par_eTestBtn: "CHECK E-TEST",
      myPage_par_inqur: "Go",
      myPage_par_inqur2: "[1:1 Inquiry]",
      myPage_par_inqur3: "",
      myPage_par_title: "Title",
      myPage_par_checkIn: "Check - IN",
      myPage_par_checkOut: "Check - OUT",
      myPage_par_totalH: "Total Hours",

      // Program
      program_checkIn_desc: "[Check In Time]",
      program_checkIn_subDesc2: "Check IN.",
      program_addSession_desc: "Bookmarked. You will be notified",
      program_addSession_subDesc:
        "by email 10 minutes before the class starts.",
      program_noTime: "This is an end session",
      program_removeSession_desc: "Bookmarked Session",
      program_removeSession_subDesc: "has been released.",

      // E-Test
      eTest_period: "Submission Period",
      eTest_total: "Total",
      eTest_munhang: "",
      eTest_submit: "Unable to modify after submission.",
      eTest_submit_desc: "Do you want to submit it?",
      eTest_submit_subDesc: "It will not be modified after submission.",
      eTest_blank_desc: "Check the blanks.",
      eTest_n_desc: "Check the answer to number ''",
      eTest_submission: "Your submission is complete.",
      eTest_cantJoin: "This is not a participating period.",
      eTest_cantJoin2: "Submission Period: ",

      // E-booth-popup
      eBooth_joined: "Thank you for your participation.",
      eBooth_alreadyJoined: "It's already done.",
    },
  },
  ko: {
    translation: {
      // 공통
      title: "제목",
      date: "작성일",
      status: "처리상태",
      search: "검색",
      submit: "제출",
      all: "전체",
      list: "목록",
      mypage: "마이페이지",
      logout_btn: "로그아웃",

      // 공통 버튼
      btn_confirm: "확인",
      btn_cancel: "취소",

      // 로그인 액션
      login_success: "로그인 되었습니다!",
      login_notToken: "액세스 토큰이 존재하지 않습니다!",
      logout: "로그아웃 되었습니다",

      // 로그인 메인페이지
      login_title: "로그인",
      login_text01:
        "사전등록 시 기입하신 이메일 정보로 <br className='m_only' /> 로그인 정보가 전달되었습니다.",
      login_text02: "※ 관련문의 : 닥터빌 컨퍼런스 / T. 1522-0209",
      login_invalidAccount: "아이디 또는 비밀번호가 일치하지 않습니다.",
      login_noInformation: "입력되지 않은 정보가 있습니다.",
      login_duplicatedLogin: "중복 로그인되어 로그아웃합니다.",
      login_remember: "ID/PW저장",
      login_findID: "아이디 찾기",
      login_findPW: "비밀번호 찾기",

      // 아이디 찾기
      findID_title: "아이디 찾기",
      findID_name: "성함",
      findID_nameInput: "이름을 입력해주세요",
      findID_mobile: "휴대폰 번호",
      findID_mobileInput: "전화번호 입력",
      findID_btnGetVerify: "인증번호 받기",
      findID_verifyNum: "인증번호",
      findID_verifyInput: "인증번호를 입력하세요",
      findID_btnVerify: "인증하기",
      findID_btnConfirm: "확인",
      findID_sent: "인증번호가 발송되었습니다.",
      findID_success: "성공적으로 인증되었습니다!",
      // findID_invalidNumber: "입력되지 않은 정보가 있습니다. 다시 입력해주세요",
      findID_invalidInf: "입력되지 않은 정보가 있습니다.",
      findID_invalidInfSub: "다시 입력해주세요.",
      findID_notMatch: "인증번호를 다시 입력해주세요.",

      // 아이디 찾기 완료
      foundID_title: "아이디 찾기 완료",
      foundID_text01: "입력하신 정보와 일치하는 아이디 입니다.",
      foundID_btnLogin: "로그인 하기",
      foundID_btnFindPW: "비밀번호 찾기",

      // 비밀번호 찾기
      findPW_title: "비밀번호 찾기",
      findPW_email: "이메일",
      findPW_emailInput: "이메일 주소를 입력해주세요",
      findPW_mobile: "휴대폰 번호",
      findPW_mobileInput: "전화번호 입력",
      findPW_btnGetVerify: "인증번호 받기",
      findPW_verifyNum: "인증번호",
      findPW_verifyInput: "인증번호를 입력하세요",
      findPW_btnVerify: "인증하기",
      findPW_btnConfirm: "확인",
      findPW_sent: "인증번호가 발송되었습니다.",
      findPW_invalidNumber: "유효한 전화번호를 입력해주세요",
      findPW_invalidInf: "입력되지 않은 정보가 있습니다.",
      findPW_invalidInfSub: "다시 입력해주세요.",
      findPW_success: "성공적으로 인증되었습니다!",
      findPW_notMatch: "인증번호를 다시 입력해주세요.",

      // 비밀번호 찾기 완료
      foundPW_title: "비밀번호 찾기",
      foundPW_reset: "비밀번호 재설정",
      foundPW_titleNew: "새 비밀번호",
      foundPW_newPasswordInput: "새 비밀번호를 입력해주세요",
      foundPW_titleConfirm: "새 비밀번호 확인",
      foundPW_confirmInput: "새 비밀번호를 재입력해주세요",
      foundPW_confirm: "확인",
      foundPW_success: "성공적으로 비밀번호가 변경되었습니다!",
      foundPW_currentPW: "현재 비밀번호",
      foundPW_currentPWInput: "현재 비밀번호를 입력해주세요",
      foundPW_notMatch: "입력하신 비밀번호가 다릅니다",
      foundPW_currMatch: "기존 비밀번호와 동일합니다.",

      // Footer
      footer_address1: "서울특별시 마포구 마포대로 109 롯데캐슬프레지던트 ",
      footer_address2: "101동 1704호 (우: 04146)",
      footer_businessNum: "사업자 번호 : 229-82-00136",

      // QuickMenu
      quickMenu_notice: "공지사항",
      quickMenu_inQuiry: "1:1 문의",

      // Live View
      liveView_time: "세션 최초 입장 시간",
      liveView_hoverText: "세션별 입/퇴장 시간에 따라 이수시간이 기록됩니다.",
      liveView_notice1: "영상이 끊기신다면 새로고침(F5)을 클릭해주세요.",
      liveView_notice2:
        "강의 종료 후 E-Test참여 바랍니다.(미참여 시 평점 이수 불가능)",
      liveView_moveRoom: "Room 이동",
      liveView_leave: "퇴장하기",
      liveView_videoPop_desc1: "영상 시청을 확인합니다.",
      liveView_videoPop_desc2: "확인버튼을 눌러 계속 참여해주세요.",
      liveView_leavePop_desc: "세션이 종료되지 않았습니다.",
      liveView_leavePop_desc1: "퇴장시간 이후 재입장이 되지 않습니다.",
      liveView_leavePop_desc2: "퇴장하시겠습니까?",
      liveView_movePop_desc1: "퇴장하기 버튼을 클릭하지 않았습니다.",
      liveView_movePop_desc2: "퇴장하시겠습니까?",

      // Abstracts View
      AbstractsView_addInterestDesc: "관심컨텐츠로 등록되었습니다.",
      AbstractsView_addInterestDesc2: "마이페이지에서 확인하세요.",
      AbstractsView_removeInterestDesc: "관심 컨텐츠 등록이",
      AbstractsView_removeInterestDesc2: "해제되었습니다.",

      // E-booth
      eBooth_participate: "부스 참여 감사드립니다.",
      eBooth_alreadyParticipate: "이미 부스에 참여 하셨습니다.",

      // Mypage
      myPage_userInfo: "회원정보",
      myPage_bookmark: "관심리스트",
      myPage_participation: "참여내역",

      // Mypage - UserInfo
      myPage_userInfo_name: "이름",
      myPage_userInfo_hospital: "소속상세",
      myPage_userInfo_license: "면허번호",
      myPage_userInfo_email: "이메일",
      myPage_userInfo_pw: "비밀번호",
      myPage_userInfo_pwInput: "비밀번호를 입력해주세요",
      myPage_userInfo_pwBtn: "비밀번호 변경",
      myPage_userInfo_mobile: "연락처",
      myPage_userInfo_emailPush: "이메일 수신",
      myPage_userInfo_smsPush: "SMS 수신",
      myPage_userInfo_agree: "동의",
      myPage_userInfo_disAgree: "동의안함",
      myPage_userInfo_save: "저장",

      // Mypage - Bookmark
      myPage_bookmark_date: "일자",
      myPage_bookmark_time: "시간",
      myPage_bookmark_title: "제목",

      // Mypage - Participation record
      myPage_par_totalHour: "총 이수시간",
      myPage_par_totalM: "분",
      myPage_par_totalPoint: "총 예상평점",
      myPage_par_totalPointNumber: "점",
      myPage_par_totalPointAlert: "(60분에 1점)",
      myPage_par_eTest: "E-TEST 내역",
      myPage_par_eTestBtn: "내역확인",
      myPage_par_inqur: "관련문의는",
      myPage_par_inqur2: "[1:1문의하기]",
      myPage_par_inqur3: "를 이용해주시기 바랍니다.",
      myPage_par_title: "제목",
      myPage_par_checkIn: "최초 입장시간",
      myPage_par_checkOut: "최종 퇴장시간",
      myPage_par_totalH: "총 이수시간",

      // Program
      program_checkIn_desc: "[입장시간]",
      program_checkIn_subDesc2: "입장합니다.",
      program_addSession_desc: "관심세션으로 등록되었습니다.",
      program_addSession_subDesc: "강의 시작 10분전에 문자가 발송됩니다.",
      program_noTime: "입장 시간이 아닙니다.",
      program_removeSession_desc: "관심 세션 등록이",
      program_removeSession_subDesc: "해제 되었습니다.",

      // E-Test
      eTest_period: "참여가능일시",
      eTest_total: "총 문항 수",
      eTest_munhang: "문항",
      eTest_submit: "제출 후 수정되지 않습니다.",
      eTest_submit_desc: "제출하시겠습니까?",
      eTest_submit_subDesc: "제출 후 수정되지 않습니다.",
      eTest_blank_desc: "풀지 않은 문항이 있습니다.",
      eTest_n_desc: "번 답을 다시 확인해주세요.",
      eTest_submission: "성공적으로 E-Test가 제출되었습니다!",
      eTest_cantJoin: "참여 가능한 기간이 아닙니다.",
      eTest_cantJoin2: "참여가능일시: ",

      // E-booth-popup
      eBooth_joined: "부스 참여 감사드립니다.",
      eBooth_alreadyJoined: "이미 부스에 참여 하셨습니다.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  fallbackLng: "ko",
  debug: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
