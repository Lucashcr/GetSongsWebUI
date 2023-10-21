import { defineStore } from "pinia";

const useMainStore = defineStore("main", {
  state: () => ({
    appBarTitle: "",
    startItems: [
      {
        title: "Página inicial",
        to: "/",
        icon: "mdi-apps",
      },
    ],
    authItems: [
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
        title: "Perfil",
        to: "/auth/profile",
        icon: "mdi-account",
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
        title: "Contato",
        to: "/contact",
        icon: "mdi-email",
      },
      {
        title: "Sobre",
        to: "/about",
        icon: "mdi-help",
      },
    ],
  }),
  actions: {
    setAppBarTitle(title: string) {
      this.appBarTitle = title;
    },
  },
});

export default useMainStore;
