export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    methods: {
      formatDateTime: function (date: string | Date) {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleString();
      },
    },
  });
});
