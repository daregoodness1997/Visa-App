import { proxy } from "valtio";

const getAuth = () => {
  if (typeof window !== "undefined") {
    const auth = window.sessionStorage.getItem("authenticated");
    return auth;
  }

  return;
};

const state = proxy({
  // isAuthenitcated: getAuth() ? true : false,
  isAuthenitcated: false,
  user: null,
});

export default state;
