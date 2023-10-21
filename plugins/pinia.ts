import { Pinia } from "pinia";
import useglobalStore from "~/store";

export default defineNuxtPlugin(({ $pinia }) => {
  return {
    provide: {
      store: useglobalStore($pinia as Pinia),
    },
  };
});
