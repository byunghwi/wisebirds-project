<template>
  <div class="flex justify-center items-center space-x-2 mt-4">
    <button @click="changePage(1)" :disabled="currentPage === 1"
      class="px-3 py-1 rounded cursor-pointer disabled:opacity-50 hover:bg-gray-300">❮❮</button>
    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
      class="px-3 py-1 rounded cursor-pointer disabled:opacity-50 hover:bg-gray-300">❮</button>

    <button v-for="page in paginatedPages" :key="page" @click="changePage(page)"
      :class="['px-3 py-1 rounded cursor-pointer hover:bg-gray-300', { 'bg-blue-500 text-white': currentPage === page }]">
      {{ page }}
    </button>

    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded cursor-pointer disabled:opacity-50 hover:bg-gray-300" >❯</button>
    <button @click="changePage(totalPages)" :disabled="currentPage === totalPages"
      class="px-3 py-1 rounded cursor-pointer disabled:opacity-50 hover:bg-gray-300">❯❯</button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  totalPages: Number,
  currentPage: Number
});

const currentPage = computed(() => Number(props.currentPage));
const totalPages = computed(() => Number(props.totalPages));

const emit = defineEmits(["update:currentPage"]);

// 페이지 번호를 5개씩 보여줄 범위 계산
const paginatedPages = computed(() => {
  const startPage = Math.floor((currentPage.value - 1) / 5) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages.value);
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:currentPage", page);
  }
};
</script>