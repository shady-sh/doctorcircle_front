// 서브메뉴

// 모바일 메뉴 열기/닫기
export function nav_show() {
  window.$("header .nav").show();
}
function nav_hide() {
  window.$("header .nav").hide();
  window.$(".subNav_active_hide").removeClass("hide");
  window.$(".subNav_active_show").removeClass("show");
  window.$("header .nav li > a + .subNav").hide();
}

// 탑버튼
window.$(document).ready(function () {
  window.$("#quick_menu .topBtn").click(function () {
    window.$("html, body").animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
});

// 팝업에서 다른 팝업 열때
function popup_to_popup(opeN, closE) {
  var popup_open = window.$("#" + opeN);
  var popup_close = window.$("#" + closE);
  popup_close.hide();
  popup_open.show();
}

//서브페이지 메뉴 외 영영클릭 시 닫기
window.$(document).mouseup(function (e) {
  var container = window.$(".menuList");
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    window.$(".selectBox input").attr("checked", false);
  }
});

// datepicker

// 페이지 버튼
window.$(function () {
  window.$(".pageBox .number").click(function () {
    window.$(".pageBox .number").removeClass("on");
    window.$(this).addClass("on");
  });
});
