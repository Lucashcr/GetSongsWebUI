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
  const userCookie = useCookie<User>("user", {
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

  const user = ref<User>(anonymousUser);
  if (userCookie.value) {
    user.value = userCookie.value;
  }

  const isAuthenticated = computed<Boolean>(() => !!accessTokenCookie.value);

  function setToken(tokenObj: { access: string; refresh: string }) {
    accessTokenCookie.value = tokenObj.access;
    refreshTokenCookie.value = tokenObj.refresh;
  }

  function setUser(userValue: User) {
    userCookie.value = userValue;
    user.value = userValue;
  }

  function getAccessToken() {
    return accessTokenCookie.value;
  }

  function logout() {
    accessTokenCookie.value = "";
    refreshTokenCookie.value = "";
    userCookie.value = anonymousUser;
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
