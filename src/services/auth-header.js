// 매 요청 시 액세스 토큰을 헤더로 담을때 사용함
export const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// export default function authHeader() {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (user && user.accessToken) {
//     return { Authorization: "Bearer " + user.accessToken };
//   } else {
//     return {};
//   }
// }

export const authHeader = user
  ? {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  : null;

export const SendHeader = user
  ? { Authorization: `Bearer ${user.accessToken}` }
  : null;
