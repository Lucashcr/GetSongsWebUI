import { defineStore } from "pinia";
import type User from "~/types/User";

const useAuthStore = defineStore("auth", () => {
  const accessTokenCookie = useCookie("access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
  const refreshTokenCookie = useCookie("refresh_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });
  const userCookie = useCookie("user", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  });

  const user = computed(() => (userCookie.value ? userCookie.value : {}));

  const backendURL = useRuntimeConfig().public.backendURL;
  const isAuthenticated = computed(() => !!accessTokenCookie.value);

  function setToken(tokenObj: { access: string; refresh: string }) {
    accessTokenCookie.value = tokenObj.access;
    refreshTokenCookie.value = tokenObj.refresh;
  }

  function setUser(userValue: Object) {
    userCookie.value = JSON.stringify(userValue);
    const user = userValue;
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
