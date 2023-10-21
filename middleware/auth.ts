import useAuthStore from "~/store/auth";

const auth = useAuthStore();

export default defineNuxtRouteMiddleware((to, from) => {
  if (!auth.isAuthenticated) {
    navigateTo("/auth/login");
  } else {
    navigateTo(to.path);
  }
});
