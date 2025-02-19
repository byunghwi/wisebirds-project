<template>
  <BaseModal :isOpen="isOpen" title="사용자 생성" @close="closeModal">
    <form @submit.prevent="submitForm">
      <label class="block mb-2">이름:</label>
      <input v-model="name" class="border p-2 w-full rounded" />

      <div class="flex justify-end mt-4">
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          생성
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from "vue";
import BaseModal from "@/components/BaseModal.vue";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const name = ref("");

const closeModal = () => {
  emit("close");
};

const submitForm = () => {
  console.log("사용자 생성:", name.value);
  closeModal();
};
</script>
