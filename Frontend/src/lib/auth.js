// export function logout() {
//   localStorage.clear();
// }

export const logout = () => {
  // Clear all localStorage data
  localStorage.clear();

  // Redirect to login page
  window.location.href = "/";
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  return !!token;
};

// export const getUserInfo = () => {
//   return {
//     userId: localStorage.getItem("userId"),
//     username: localStorage.getItem("username"),
//     role: localStorage.getItem("role"),
//     token: localStorage.getItem("accessToken"),
//   };
// };

// export const setUserInfo = (userInfo) => {
//   localStorage.setItem("accessToken", userInfo.token);
//   localStorage.setItem("userId", userInfo.userId);
//   localStorage.setItem("username", userInfo.username);
//   localStorage.setItem("role", userInfo.role);
// };
