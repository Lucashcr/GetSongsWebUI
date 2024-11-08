import { defineStore } from "pinia";
import type User from "~/types/user";

const useAuthStore = defineStore("auth", () => {
  const sessionTokenCookie = useCookie("token", {
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

  const isAuthenticated = computed<Boolean>(() => !!sessionTokenCookie.value);

  function setToken(tokenObj: { token: string }) {
    sessionTokenCookie.value = tokenObj.token;
  }

  function setUser(userValue: User) {
    userCookie.value = userValue;
    user.value = userValue;
  }

  function getSessionToken() {
    console.log(sessionTokenCookie.value)
    return sessionTokenCookie.value;
  }

  function logout() {
    sessionTokenCookie.value = "";
    userCookie.value = anonymousUser;
  }

  return {
    user,
    isAuthenticated,
    setUser,
    setToken,
    getSessionToken,
    logout,
  };
});

export default useAuthStore;
