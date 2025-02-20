<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 relative">
      <button @click="closeModal" class="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        ✖
      </button>

      <!-- title -->
      <h2 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h2>

      <!-- content -->
      <slot></slot>

      <div class="flex justify-end mt-4">
        <button @click="closeModal" class="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean, // 모달 열림 상태
  title: String,    // 모달 제목
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>