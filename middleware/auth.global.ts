import useAuthStore from "~/store/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (to.meta?.requiresAuth) {
    if (!auth.isAuthenticated) {
      console.log("Not authenticated, redirecting to /auth/login");
      return navigateTo("/auth/login?next=" + to.path);
    }
  }
});
