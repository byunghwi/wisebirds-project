<template>
  <div 
    v-if="isOpen" 
    class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-10"
  >
    <div 
      class="bg-white p-6 rounded-lg shadow-lg relative"
      :class="modalSize"
    >
      <button @click="closeModal" class="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        ✖
      </button>

      <!-- title -->
      <h2 v-if="title" class="text-xl font-semibold mb-4">{{ title }}</h2>

      <!-- content -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  isOpen: Boolean,
  title: String,
  size: {
    type: String,
    default: "md", // 기본값 설정
  }
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

// 크기 클래스 동적 설정
const modalSize = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-64"; // 작은 모달
    case "md":
      return "w-96"; // 기본 크기 (기존과 동일)
    case "lg":
      return "w-[600px]"; // 넓은 모달
    case "xl":
      return "w-[800px]"; // 초대형 모달
    default:
      return "w-96"; // 기본 크기
  }
});
</script>