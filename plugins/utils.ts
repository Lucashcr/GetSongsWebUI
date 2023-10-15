export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatDateTime: (datetime: Date) => {
        const parsedDateTime = new Date(datetime);
        return `${parsedDateTime.toLocaleDateString()} às ${parsedDateTime.toLocaleTimeString()}`;
      },
    },
  };
});
