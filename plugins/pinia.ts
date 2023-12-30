import { Pinia } from "pinia";
import useGlobalStore from "~/store";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useGlobalStore($pinia as Pinia),
    },
  };
});
