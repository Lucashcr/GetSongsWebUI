import useAuthStore from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  if (to.meta?.requiresAuth) {
    if (!auth.isAuthenticated) {
      return navigateTo("/auth/login?next=" + to.path);
    }
  }
});
