<template>
  <v-card class="pa-4 rounded-xl">
    <v-card-title>
      Se você tem alguma dúvida ou sugestão, pode entrar em contato conosco
      através do formulário abaixo:
    </v-card-title>

    <v-card-text>
      <v-form @submit.prevent="sendMessage">
        <v-text-field
          label="Nome"
          required
          v-model="message.name"
        ></v-text-field>
        <v-text-field
          label="E-mail"
          required
          v-model="message.email"
          :rules="rules.email"
        ></v-text-field>
        <v-textarea
          label="Mensagem"
          required
          v-model="message.text"
        ></v-textarea>
        <div class="d-flex justify-center">
          <v-btn type="submit" color="primary">Enviar</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
const EMAIL_REGEX = /^.+@.+\..+$/;

export default {
  name: "ContactView",
  layout: "centered",
  created() {
    this.$store.setAppBarTitle("Fale conosco!");
  },
  data() {
    return {
      message: {
        name: this.$auth.loggedIn
          ? this.$store.state.global.user.full_name
          : "",
        email: this.$auth.loggedIn ? this.$store.state.global.user.email : "",
        text: "",
      },
      rules: {
        email: [
          (v) => !!v || "E-mail é obrigatório",
          (v) => EMAIL_REGEX.test(v) || "E-mail deve ser válido",
        ],
      },
    };
  },
  methods: {
    sendMessage() {
      const data = {
        name: this.name,
        email: this.email,
        message: this.message,
      };

      if (!EMAIL_REGEX.test(this.message.email)) {
        alert("Por favor, digite um email válido!");
        return;
      }

      this.$router.push("/thanks");
    },
  },
};
</script>
