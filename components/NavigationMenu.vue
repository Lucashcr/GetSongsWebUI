<script setup>
import useAuthStore from "~/store/auth";

const auth = useAuthStore();

const menuItems = {
  start: [
    {
      title: "Página inicial",
      to: "/",
      icon: "mdi-apps",
    },
  ],
  hymnary: [
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
  auth: [
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
  notAuth: [
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
  end: [
    {
      title: "Sobre",
      to: "/about",
      icon: "mdi-help",
    },
  ],
}

useHead({
  title: "GetSongs",
  meta: [
    {
      name: "description",
      content: "Plataforma de montagem e geração automática de hinários.",
    },
  ],
});
</script>

<template>
  <v-no-ssr>
    <v-navigation-drawer app expand-on-hover rail permanent>
      <v-container class="fill-height pa-0 flex-column">
        <v-col>
          <v-row>
            <v-list>
              <v-list-item v-for="item in menuItems.start" :key="item.to" :to="item.to" router exact
                :prepend-icon="item.icon" :title="item.title"></v-list-item>
            </v-list>
            <v-list v-if="auth.isAuthenticated">
              <v-list-item v-for="item in menuItems.hymnary" :key="item.to" :to="item.to" router exact
                :prepend-icon="item.icon" :title="item.title"></v-list-item>
            </v-list>
          </v-row>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="flex-grow-0">
          <v-row>
            <v-list>
              <template v-if="auth.isAuthenticated">
                <v-list-item v-for="item in menuItems.auth" :key="item.to" :to="item.to" router exact
                  :prepend-icon="item.icon" :title="item.title">
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item v-for="item in menuItems.notAuth" :key="item.to" :to="item.to" router exact
                  :prepend-icon="item.icon" :title="item.title">
                </v-list-item>
              </template>
              <v-list-item v-for="item in menuItems.end" :key="item.to" :to="item.to" router exact
                :prepend-icon="item.icon" :title="item.title"></v-list-item>
            </v-list>
          </v-row>
        </v-col>
      </v-container>
    </v-navigation-drawer>
  </v-no-ssr>
</template>

<style scoped>
.v-list {
  width: 100%;
}

.v-list-item {
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
