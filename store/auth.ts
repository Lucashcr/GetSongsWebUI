import { defineStore } from "pinia";

const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user") || "{}"));
  const isAuthenticated = ref(false);

  function setToken(tokenValue: string) {
    localStorage.setItem("token", tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue: Object) {
    localStorage.setItem("user", JSON.stringify(userValue));
    user.value = userValue;
  }

  async function verifyToken() {
    const backendURL = useRuntimeConfig().public.backendURL;
    const token = "Bearer " + localStorage.getItem("token");
    const response = await $fetch(`${backendURL}/user/me/`, {
      headers: {
        Authorization: token,
      },
    });
    isAuthenticated.value = true;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    token.value = "";
    user.value = {};
    isAuthenticated.value = false;
  }

  return {
    token,
    user,
    isAuthenticated,
    setToken,
    setUser,
    verifyToken,
    logout,
  };
});

export default useAuthStore;
