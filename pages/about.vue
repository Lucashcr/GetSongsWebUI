<script setup lang="ts">
import CustomLink from "~/components/CustomLink.vue";

import useglobalStore from "~/store";

const globalStore = useglobalStore();

definePageMeta({
  name: "About",
  layout: "default",
});

onMounted(() => {
  globalStore.setAppBarTitle("Curioso sobre o projeto?");
});
</script>

<template>
  <v-card class="mb-2 pa-10">
    <section>
      <p>
        A plataforma
        <CustomLink to="https://github.com/Lucashcr/GetSongsWeb"
          >GetSongs</CustomLink
        >
        foi desenvolvida com a intenção de tornar a montagem de hinários mais
        fácil e rápida. A ideia surgiu a partir da experiência do seu criador,
        <CustomLink to="https://www.linkedin.com/in/lucas-rocha-8b6655216/"
          >Lucas Rocha</CustomLink
        >
        , em igrejas e outras organizações religiosas, onde era comum encontrar
        dificuldades para criar hinários personalizados para eventos, missas,
        entre outros. Além disso, com a ajuda da tecnologia, o GetSongs foi
        desenvolvido com uma abordagem inovadora para a montagem de hinários,
        com foco na praticidade e facilidade de uso, já que convencionalmente
        todo o processo para a confecção destes hinários é manual.
      </p>

      <p>
        Para criar a aplicação, foram utilizados o framework
        <CustomLink to="https://www.djangoproject.com/">Django</CustomLink> e
        <CustomLink to="https://www.django-rest-framework.org/"
          >Django REST Framework</CustomLink
        >
        para construção do <em>back-end</em> e
        <CustomLink to="https://v2.nuxt.com/">Nuxt</CustomLink>,
        <CustomLink to="https://v2.vuejs.org/">Vuejs</CustomLink> e
        <CustomLink to="https://v2.vuetifyjs.com/">Vuetify</CustomLink>
        para o <em>front-end</em>. Django é um framework em
        <CustomLink to="https://www.python.org/">Python</CustomLink>, conhecido
        por sua facilidade de uso, segurança e escalabilidade, sendo amplamente
        utilizado no desenvolvimento web. Já o Bootstrap é um framework
        front-end que permite a criação de interfaces responsivas e elegantes,
        com uma ampla variedade de recursos e componentes.
      </p>

      <p>
        Em resumo, o GetSongs é o resultado do trabalho e dedicação do seu
        criador como primeiro projeto <em>full-stack</em>, tornando a montagem
        de hinários mais fácil e acessível para todos. Com tecnologias
        confiáveis e modernas, a plataforma oferece uma solução inovadora para a
        criação de hinários personalizados para eventos religiosos e outras
        ocasiões.
      </p>
    </section>
  </v-card>
</template>
