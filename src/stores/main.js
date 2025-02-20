import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const currentAuth = ref('admin');

  return { currentAuth }
})
