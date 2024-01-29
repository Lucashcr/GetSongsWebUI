<script setup>
import useAuthStore from "~/store/auth";
import useGlobalStore from "~/store";

const auth = useAuthStore();
const globalStore = useGlobalStore();

definePageMeta({
  name: "Profile",
  layout: "centered",
  requiresAuth: true,
});

onMounted(() => {
  globalStore.setAppBarTitle("Deseja editar o seu perfil?");
});

const changoPasswordDialog = reactive({
  show: false,
});

const messageDialog = reactive({
  show: false,
  title: "",
  messages: [""],
});
</script>

<template>
  <section>
    <v-card class="d-flex flex-column align-center rounded-lg pa-4">
      <v-card-title>Perfil</v-card-title>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <tr>
              <th class="text-left">Usuário</th>
              <td>{{ auth.user.username }}</td>
            </tr>
            <tr>
              <th class="text-left">Nome</th>
              <td>{{ auth.user.first_name }} {{ auth.user.last_name }}</td>
            </tr>
            <tr>
              <th class="text-left">Email</th>
              <td>{{ auth.user.email }}</td>
            </tr>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey lighten-3" @click="changoPasswordDialog.show = true"
          >Trocar senha</v-btn
        >
        <v-btn color="grey lighten-3" to="/auth/logout">Sair</v-btn>
      </v-card-actions>
    </v-card>
    <ChangePasswordDialog
      v-model="changoPasswordDialog.show"
      @on-close="
        console.log('Password changed');
        messageDialog.title = 'Prontinho!';
        messageDialog.messages = ['Senha alterada com sucesso!'];
        messageDialog.show = true;
      "
    />
    <MessageDialog
      v-model="messageDialog.show"
      :title="messageDialog.title"
      :messages="messageDialog.messages"
    />
  </section>
</template>

<style scoped>
th {
  width: 5rem;
}

tr {
  display: flex;
  gap: 1rem;
}
</style>
