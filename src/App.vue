<template>
  <div class="h-screen w-screen relative flex-col">
    <div class="fixed top-0 left-0 w-full z-10">
      <TopMenu />
    </div>
    <div class="flex-1 pt-[60px]">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import TopMenu from '@/components/TopMenu.vue';
</script>
