<template>
  <v-card class="pa-4 rounded-xl">
    <v-form class="d-flex flex-column align-center">
      <v-text-field v-model="newHymnary.title" label="Título" required></v-text-field>
      <v-btn @click="saveHymnary" :disabled="setButtonDisabled()" color="primary">Salvar</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "HymnaryNew",
  layout: "centered",
  head: {
    title: "Novo Hinário",
  },
  middleware: ["auth"],
  created() {
    this.$store.setAppBarTitle("Vamos criar um novo hinário!");
    this.$axios
      .get("/api/hymnary")
      .then((res) => {
        this.hymnaries = res.data;
      })
      .catch((err) => {
        this.$toasted.global.defaultError({
          msg: "Não foi possível carregar seus hinários.",
        });
      });
  },
  data() {
    return {
      hymnaries: [],
      newHymnary: {
        title: ""
      }
    };
  },
  methods: {
    setButtonDisabled() {
      if (this.newHymnary.title === "") return true;
      return this.hymnaries.some(hymnary => hymnary.title === this.newHymnary.title);
    },
    saveHymnary() {
      this.$axios
        .post(`/api/hymnary`, this.newHymnary)
        .then((res) => {
          this.$toasted.global.defaultSuccess({
            msg: "Hinário criado com sucesso!",
          });
          console.log(res.data);
          this.$router.push(`/hymnary/${res.data.id}`);
        })
        .catch((err) => {
          this.$toasted.global.defaultError({
            msg: "Não foi possível criar o hinário.",
          });
        });
    },
  },
}
</script>