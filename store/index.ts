import { defineStore } from "pinia";

const useGlobalStore = defineStore("main", {
  state: () => ({
    appBarTitle: "",
    isLoading: false,
  }),
  actions: {
    setAppBarTitle(title: string) {
      this.appBarTitle = title;
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});

export default useGlobalStore;
