import useAuthStore from "~/store/auth";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const backendURL = useRuntimeConfig().public.backendURL;

  return {
    provide: {
      fetchApi: {
        async get(path: string) {
          const response = await $fetch(`${backendURL}/api${path}`, {
            headers: {
              Authorization: `Token ${authStore.getSessionToken()}`,
            },
          });
          return response;
        },

        async post(path: string, body: any) {
          const response = await $fetch(`${backendURL}/api${path}`, {
            method: "POST",
            headers: {
              Authorization: `Token ${authStore.getSessionToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          return response;
        },

        async put(path: string, body: any) {
          const response = await $fetch(`${backendURL}/api${path}`, {
            method: "PUT",
            headers: {
              Authorization: `Token ${authStore.getSessionToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          return response;
        },

        async patch(path: string, body: any) {
          const response = await $fetch(`${backendURL}/api${path}`, {
            method: "PATCH",
            headers: {
              Authorization: `Token ${authStore.getSessionToken()}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          return response;
        },

        async delete(path: string) {
          const response = await $fetch(`${backendURL}/api${path}`, {
            method: "DELETE",
            headers: {
              Authorization: `Token ${authStore.getSessionToken()}`,
            },
          });
          return response;
        },
      },
    },
  };
});
