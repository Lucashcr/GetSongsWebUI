import { defineStore } from "pinia";

const useGlobalStore = defineStore("main", {
  state: () => ({
    appBarTitle: "",
    startItems: [
      {
        title: "Página inicial",
        to: "/",
        icon: "mdi-apps",
      },
    ],
    hymnaryItems: [
      {
        title: "Novo hinário",
        to: "/hymnary/new",
        icon: "mdi-note-plus-outline",
      },
      {
        title: "Meus hinários",
        to: "/hymnary",
        icon: "mdi-note-multiple-outline",
      },
      {
        title: "Minhas tags",
        to: "/tags",
        icon: "mdi-tag-outline",
      }
    ],
    authItems: [
      {
        title: "Perfil",
        to: "/auth/profile",
        icon: "mdi-account",
      },
      {
        title: "Contato",
        to: "/contact",
        icon: "mdi-email",
      },
      {
        title: "Sair",
        to: "/auth/logout",
        icon: "mdi-logout",
      },
    ],
    notAuthItems: [
      {
        title: "Entrar",
        to: "/auth/login",
        icon: "mdi-login",
      },
      {
        title: "Cadastrar",
        to: "/auth/register",
        icon: "mdi-account-plus",
      },
    ],
    endItems: [
      {
        title: "Sobre",
        to: "/about",
        icon: "mdi-help",
      },
    ],
    isLoading: false,
  }),
  actions: {
    setAppBarTitle(title: string) {
      this.appBarTitle = title;
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});

export default useGlobalStore;
