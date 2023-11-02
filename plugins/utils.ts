import Hymnary from "~/types/hymnary";

export default defineNuxtPlugin(() => {
  const { $fetchApi } = useNuxtApp();
  return {
    provide: {
      formatDateTime: (datetime: Date) => {
        const parsedDateTime = new Date(datetime);
        return `${parsedDateTime.toLocaleDateString()} às ${parsedDateTime.toLocaleTimeString()}`;
      },
      
      exportHymnary: async (hymnary: Hymnary) => {
        const data = await $fetchApi.get(`/hymnary/${hymnary.id}/export`) as BlobPart;
        const blob = new Blob([data], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = `${hymnary.title}.pdf`;
        link.click();
      }
    },
  };
});
