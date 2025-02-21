<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="fixed top-0 left-0 w-full z-10 h-[50px]">
      <TopMenu />
    </div>
    <div class="flex pt-[50px] items-center justify-center">
      <RouterView />
    </div>
    <ErrorModal :isOpen="isErrorModalOpen" @close="closeModal"/>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { storeToRefs } from 'pinia';
import TopMenu from '@/components/TopMenu.vue';
import { useModalStore } from '@/stores/modal';
import ErrorModal from '@/components/ErrorModal.vue';
const storeModal = useModalStore();
const { isErrorModalOpen } = storeToRefs(storeModal);
const { closeModal } = storeModal;
</script>
