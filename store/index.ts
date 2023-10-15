import { defineStore } from "pinia";

const useMainStore = defineStore("main", {
  state: () => ({
    appBarTitle: "",
    startItems: [
      {
        title: "Página inicial",
        to: "/",
        props: {
          prependIcon: "mdi-apps",
        },
      },
    ],
    hymaryItems: [
      {
        title: "Novo hinário",
        to: "/hymnary/new",
        props: {
          prependIcon: "mdi-note-plus-outline",
        },
      },
      {
        title: "Meus hinários",
        to: "/hymnary",
        props: {
          prependIcon: "mdi-note-multiple-outline",
        },
      },
    ],
    authItems: [
      {
        title: "Perfil",
        to: "/auth/profile",
        props: {
          prependIcon: "mdi-account",
        },
      },
      {
        title: "Sair",
        to: "/auth/logout",
        props: {
          prependIcon: "mdi-logout",
        },
      },
    ],
    notAuthItems: [
      {
        title: "Entrar",
        to: "/auth/login",
        props: {
          prependIcon: "mdi-login",
        },
      },
      {
        title: "Cadastrar",
        to: "/auth/register",
        props: {
          prependIcon: "mdi-account-plus",
        },
      },
    ],
    endItems: [
      {
        title: "Contato",
        to: "/contact",
        props: {
          prependIcon: "mdi-email",
        },
      },
      {
        title: "Sobre",
        to: "/about",
        props: {
          prependIcon: "mdi-help",
        },
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
