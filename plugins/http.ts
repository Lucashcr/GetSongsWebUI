import axios from "axios";

export default defineNuxtPlugin(() => {
  const defaultUrl = "<http://localhost:8000>";

  const backend = axios.create({
    baseURL: defaultUrl,
    headers: {
      common: {},
    },
  });

  return {
    provide: {
      backend,
    },
  };
});
