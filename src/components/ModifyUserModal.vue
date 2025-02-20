<template>
  <BaseModal :isOpen="isOpen" title="사용자 수정" size="xl" @close="closeModal">
    <form @submit.prevent="submitForm">
      <!-- 아이디 -->
      <label class="block text-gray-700 font-medium mb-1">아이디<span class="text-red-500">*</span></label>
      <input
        :value="userInfo.email"
        class="border p-2 w-full rounded bg-gray-100 text-gray-500 cursor-not-allowed"
        disabled
      />

      <!-- 이름 -->
      <label class="block text-gray-700 font-medium mt-4 mb-1">이름<span class="text-red-500">*</span></label>
      <input
        v-model="newName"
        class="border p-2 w-full rounded"
        :class="{ 'border-red-500': nameError }"
      />
      <p v-if="nameError" class="text-red-500 text-sm mt-1">
        {{ nameError }}
      </p>

      <!-- 버튼 -->
      <div class="flex justify-end mt-4 space-x-8">
        <button @click="closeModal" class="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          취소
        </button>
        <button
          type="button"
          :disabled="!isValid"
          :class="['px-4 py-2 rounded',
            isValid ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]"
        >
          저장
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore)
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const newName = ref("");
const nameError = ref(false);

// 이름 검증 함수
const validateName = () => {
  if (!newName.value.trim()) {
    nameError.value = "이름을 입력해주세요.";
  } else if (!/^[가-힣a-zA-Z]{1,16}$/.test(newName.value)) {
    nameError.value = "이름을 올바르게 입력하세요. (한글, 영문 1~16자 / 숫자, 특수문자, 공백 불가)";
  } else {
    nameError.value = "";
  }
};

// `newName`이 변경될 때마다 실시간으로 검증
watchEffect(() => {
  validateName();
});

// 전체 유효성 검사
const isValid = computed(() => !nameError.value && newName.value.trim().length > 0);

const closeModal = () => {
  emit("close");
};

const submitForm = () => {
  console.log("사용자 수정:", newName.value);
  closeModal();
};
</script>