import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false);
  const closeModal = () => {
    isModalOpen.value = false;
  }

  return {
    isModalOpen, 
    closeModal
  }
})