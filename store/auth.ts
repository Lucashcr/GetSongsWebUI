import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", () => {
  const backendURL = useRuntimeConfig().public.backendURL;
  const accessToken = ref(localStorage.getItem("access_token"));
  const refreshToken = ref(localStorage.getItem("refresh_token"));
  const user = ref(JSON.parse(localStorage.getItem("user") || "{}"));
  const isAuthenticated = ref(false);

  function setToken(tokenObj: { access: string; refresh: string }) {
    localStorage.setItem("access_token", tokenObj.access);
    localStorage.setItem("refresh_token", tokenObj.refresh);
    accessToken.value = tokenObj.access;
    refreshToken.value = tokenObj.refresh;
  }

  function setUser(userValue: Object) {
    localStorage.setItem("user", JSON.stringify(userValue));
    user.value = userValue;
  }

  async function verifyToken() {
    const token = "Bearer " + localStorage.getItem("access_token");
    const response = await $fetch(`${backendURL}/user/me/`, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        isAuthenticated.value = true;
      })
      .catch((error) => {
        isAuthenticated.value = false;
      });
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    accessToken.value = "";
    refreshToken.value = "";
    user.value = {};
    isAuthenticated.value = false;
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    setUser,
    setToken,
    verifyToken,
    logout,
  };
});

export default useAuthStore;
