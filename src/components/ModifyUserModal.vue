<template>
  <BaseModal :isOpen="isOpen" title="사용자 수정" @close="closeModal">
    <form @submit.prevent="submitForm">
      <label class="block mb-2">새로운 이름:</label>
      <input v-model="newName" class="border p-2 w-full rounded" />

      <div class="flex justify-end mt-4">
        <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          수정
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

const newName = ref("");

const closeModal = () => {
  emit("close");
};

const submitForm = () => {
  console.log("사용자 수정:", newName.value);
  closeModal();
};
</script>