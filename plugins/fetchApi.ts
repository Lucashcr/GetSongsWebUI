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
              Authorization: `Bearer ${authStore.token}`,
            },
          });
          return response;
        },

        async post(path: string, body: any) {
          const response = await $fetch(`${backendURL}/api${path}`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authStore.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          return response;
        },
      },
    },
  };
});
