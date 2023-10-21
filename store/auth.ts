import { ref } from "vue";
import { defineStore } from "pinia";

import http from "~/plugins/http";

export const useAuthStore = defineStore("auth", () => {
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
    try {
      const token = "Bearer " + localStorage.getItem("token");
      const response = await $fetch("http://localhost:8000/user/me/", {
        headers: {
          Authorization: token,
        },
      });
      isAuthenticated.value = true;
    } catch (error) {
      isAuthenticated.value = false;
    }
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
