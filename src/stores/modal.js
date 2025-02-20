import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false);
  const isErrorModalOpen = ref(false);;
  
  const closeModal = () => {
    isModalOpen.value = false;
    isErrorModalOpen.value = false;
  }
  // 에러발생 시 모달
  const showErrorModal = () => {
    isErrorModalOpen.value = true;
  };

  return {
    isModalOpen, 
    isErrorModalOpen,
    closeModal,
    showErrorModal,
  }
})