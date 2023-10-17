<template>
  <section class="mt-8">
    <p>
      Somos uma plataforma de montagem e geração automática de hinários. Nosso
      serviço é especialmente projetado para ajudar músicos católicos a criar
      hinários personalizados com facilidade. Se você está procurando um hinário
      para um casamento, batizado, missa ou outro evento, o GetSongs é a escolha
      perfeita. Nosso compromisso de oferecer uma experiência de montagem de
      hinário fácil, rápida e conveniente para todos os tipos de eventos e
      ocasiões.
    </p>

    <p>
      Aqui você pode montar seu hinário escolhendo entre uma ampla variedade de
      músicas disponíveis em nossa biblioteca e personalizá-lo de acordo com as
      suas necessidades. Além disso, nossa equipe está sempre atualizando a
      biblioteca com as últimas músicas e tendências, para garantir que você
      tenha acesso às músicas mais recentes e populares.
    </p>

    <p>
      Após finalizar a montagem do hinário, o GetSongs pode, com apenas um
      clique, exportar automaticamente um documento em formato PDF com todas as
      letras das músicas na sequência estabelecida e com as configurações
      definidas pelo usuário. Isso significa que você pode ter acesso a seu
      hinário personalizado a qualquer momento, em qualquer lugar e em qualquer
      dispositivo, permitindo que você compartilhe seu hinário com facilidade.
    </p>

    <p>
      Portanto, se você precisa de um hinário para uma ocasião especial, o
      GetSongs é a escolha perfeita. Obrigado por escolher o GetSongs.
      Experimente já nosso serviço e veja como é fácil criar seu próprio hinário
      personalizado.
    </p>
  </section>
</template>

<script>
export default {
  name: "HomeView",
  created() {
    this.$store.setAppBarTitle("Bem vindo ao GetSongs!");
    //  commit("global/setAppBarTitle", "Bem vindo ao GetSongs!");
  },
};
</script>
