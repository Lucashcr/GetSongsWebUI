<script setup>
import useAuthStore from "~/store/auth";

const auth = useAuthStore();
const backendURL = useRuntimeConfig().public.backendURL;

const dialog = defineModel();

const formValid = ref(false);

const oldPassword = ref("");
const password = ref("");
const confirmPassword = ref("");
const messages = ref("");

const rules = {
  oldPassword: [(v) => !!v || "Senha é obrigatória"],
  password: [
    (v) => !!v || "Senha é obrigatória",
    (v) => v.length >= 8 || "Senha deve ter no mínimo 8 caracteres",
  ],
  confirmPassword: [
    (v) => !!v || "Confirmação de senha é obrigatória",
    (v) => v === password.value || "Senhas não conferem",
  ],
};

const emit = defineEmits(["onClose"]);

defineComponent({
  name: "ChangePasswordDialog",
});

onMounted(() => {
  password.value = "";
  oldPassword.value = "";
  confirmPassword.value = "";
});

async function onSubmit() {
  if (!formValid.value) return;

  const response = await $fetch(`${backendURL}/user/change-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${auth.getSessionToken()}`,
    },
    body: JSON.stringify({
      old_password: oldPassword.value,
      new_password: password.value,
    }),
  });

  if (response.ok) {
    dialog.value = false;
    emit("onClose");
  } else {
    messages.value = response.messages;
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition">
    <v-card class="pa-4 rounded-xl">
      <v-card-title>Alterar senha</v-card-title>
      <v-card-text>
        <v-form v-model="formValid">
          <v-text-field
            v-model="oldPassword"
            :rules="rules.oldPassword"
            label="Senha antiga"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="rules.password"
            label="Senha nova"
            type="password"
          ></v-text-field>
          <v-text-field
            v-model="confirmPassword"
            :rules="rules.confirmPassword"
            label="Confirmação da senha nova"
            type="password"
          ></v-text-field>
          <p v-for="message in messages" :key="message" class="error-message">
            {{ message }}
          </p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!formValid" @click="onSubmit">
              Alterar
            </v-btn>
            <v-btn color="error" @click="dialog = false">Cancelar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.error-message {
  color: red;
}
</style>
