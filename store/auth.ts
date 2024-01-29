import { defineStore } from "pinia";
import type User from "~/types/user";

const useAuthStore = defineStore("auth", () => {
  const accessTokenCookie = useCookie("access_token", {
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
  const refreshTokenCookie = useCookie("refresh_token", {
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
  const userCookie = useCookie("user", {
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  const anonymousUser: User = {
    username: "",
    first_name: "",
    last_name: "",
    full_name: "",
    email: "",
  };

  console.log(userCookie.value);
  console.log(accessTokenCookie.value);

  const user = ref<User>(anonymousUser);

  const isAuthenticated = computed<Boolean>(() => !!accessTokenCookie.value);

  function setToken(tokenObj: { access: string; refresh: string }) {
    accessTokenCookie.value = tokenObj.access;
    refreshTokenCookie.value = tokenObj.refresh;
  }

  function setUser(userValue: string) {
    userCookie.value = userValue;
    user.value = JSON.parse(userValue);
  }

  function getAccessToken() {
    return accessTokenCookie.value;
  }

  function logout() {
    accessTokenCookie.value = "";
    refreshTokenCookie.value = "";
    userCookie.value = "";
  }

  return {
    user,
    isAuthenticated,
    setUser,
    setToken,
    getAccessToken,
    logout,
  };
});

export default useAuthStore;
