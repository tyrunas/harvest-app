import { defineStore } from "pinia";

export const useHarvest = defineStore("harvest", {
  state: () => {
    return {
      users: [],
      entries: [],
      monthUsers: [],
    };
  },
  actions: {
    sortUsers() {
      this.users.sort((a, b) => b.totalHours - a.totalHours);
    },
  },
});
