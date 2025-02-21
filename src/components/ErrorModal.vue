<template>
  <BaseModal :isOpen="isOpen" size="lg" @close="closeModal">
    <div class="p-2 text-center space-y-3">
      <p class="text-lg font-semibold text-gray-600">에러가 발생했습니다.</p>
      <p class="text-gray-700 pb-4">같은 현상이 반복되면 고객센터로 문의 바랍니다.</p>

      <div class="bg-gray-100 p-2 rounded-lg text-sm text-gray-600">
        <p class="font-semibold text-left">※ 고객센터</p>
        <p class="text-left">- email: <a href="mailto:helpdesk@wisebirds.ai" class="text-blue-500 hover:underline">helpdesk@wisebirds.ai</a></p>
      </div>

      <!-- 버튼 -->
      <div class="flex justify-center pt-4">
        <button
          type="button"
          class="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
          @click="closeModal"
        >
          확인
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseModal from './BaseModal.vue';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

</script>