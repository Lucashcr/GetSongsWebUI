<template>
  <section>
    <div class="d-flex align-center justify-center flex-wrap" v-if="hymnaries">
      <v-card v-for="hymnary in hymnaries" :key="hymnary.id" width="33%" class="ma-1"
        @click="$router.push(`hymnary/${hymnary.id}`)">
        <v-card-title>{{ hymnary.title }}</v-card-title>
        <v-card-text>Criado em: {{ formatDateTime(hymnary.created_at) }}</v-card-text>
      </v-card>
    </div>
    <Loading v-else />
  </section>
</template>

<script>
export default {
  name: "HymnaryList",
  head: {
    title: "Hinários",
  },
  middleware: ["auth"],
  mounted() {
    // this.$store.commit("global/setAppBarTitle", "Aqui estão seus hinários!");
    this.$store.setAppBarTitle("Aqui estão seus hinários!");
    this.$axios.get("/api/hymnary")
      .then((res) => {
        this.hymnaries = res.data;
        if (!this.hymnaries.length) {
          this.$toasted.global.defaultError({
            msg: "Você não tem nenhum hinário.",
          });
        }
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
    };
  },
  methods: {
    formatDateTime(datetime) {
      const parsedDateTime = new Date(datetime);
      return parsedDateTime.toLocaleString();
    },
  },
};
</script>
