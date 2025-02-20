import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({});
  const userList = ref([]);

  return {
    userInfo,
    userList
  }
});