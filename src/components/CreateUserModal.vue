<template>
  <BaseModal :isOpen="isOpen" title="사용자 생성" size="lg" @close="closeModal">
      <!-- 아이디 -->
      <label class="block text-gray-700 font-medium mb-1">아이디<span class="text-red-500">*</span></label>
      <div class="relative w-full">
        <div class="flex items-center w-full"><input v-model="newUser.id" class="border p-2 w-full rounded"
            :class="{ 'border-red-500': idError }" /></div>
        <p v-if="idError" class="text-red-500 text-sm mt-1">
          {{ idError }}
        </p>
      </div>

      <!-- 비밀번호 -->
      <label class="block text-gray-700 font-medium mt-4 mb-1">비밀번호<span class="text-red-500">*</span></label>
      <div class="relative w-full">
        <div class="flex items-center w-full relative">
          <input :type="inputType" v-model="newUser.password" class="border p-2 w-full rounded pr-10 box-border"
            :class="{ 'border-red-500': passError }" placeholder="영문, 숫자, 특수문자 조합 8~15자" />
          <svg v-if="inputType == 'password'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="currentColor" class="bi bi-eye-fill absolute right-2 cursor-pointer" viewBox="0 0 16 16"
            @click="changeInputType('inputType')">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
          </svg>
          <svg v-else-if="inputType == 'text'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="currentColor" class="bi bi-eye-slash absolute right-2 cursor-pointer" viewBox="0 0 16 16"
            @click="changeInputType('inputType')">
            <path
              d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
            <path
              d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
            <path
              d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
          </svg>
        </div>
        <p v-if="passError" class="text-red-500 text-sm mt-1">
          {{ passError }}
        </p>
      </div>

      <!-- 비밀번호 확인 -->
      <label class="block text-gray-700 font-medium mt-4 mb-1">비밀번호 확인<span class="text-red-500">*</span></label>
      <div class="relative w-full">
        <div class="flex items-center w-full relative">
          <input :type="confirmType" v-model="confirmPassword" class="border p-2 w-full rounded pr-8 box-border"
            :class="{ 'border-red-500': confirmError }" placeholder="영문, 숫자, 특수문자 조합 8~15자" />
          <svg v-if="confirmType == 'password'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="currentColor" class="bi bi-eye-fill absolute right-2 " viewBox="0 0 16 16"
            @click="changeInputType('confirmType')">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
          </svg>
          <svg v-else-if="confirmType == 'text'" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
            fill="currentColor" class="bi bi-eye-slash absolute right-2 " viewBox="0 0 16 16"
            @click="changeInputType('confirmType')">
            <path
              d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
            <path
              d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
            <path
              d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
          </svg>
        </div>

        <p v-if="confirmError" class="text-red-500 text-sm mt-1">
          {{ confirmError }}
        </p>
      </div>

      <!-- 이름 -->
      <label class="block text-gray-700 font-medium mb-1">이름<span class="text-red-500">*</span></label>
      <input v-model="newUser.name" class="border p-2 w-full rounded" :class="{ 'border-red-500': nameError }" />
      <p v-if="nameError" class="text-red-500 text-sm mt-1">
        {{ nameError }}
      </p>

      <!-- 버튼 -->
      <div class="flex justify-end pt-4 gap-4">
        <button @click="closeModal" class="cursor-pointer px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          취소
        </button>
        <button type="button" @click="create" :disabled="!isValid" :class="['px-4 py-2 rounded',
            isValid ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          ]">
          저장
        </button>
      </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import { getisExistEmail, createUser } from "@/api/users";
import { useModalStore } from "@/stores/modal";
import router from "@/router";

const storeModal = useModalStore();
const { showErrorModal } = storeModal;

defineProps({
  isOpen: Boolean,
});

const inputType = ref('password')
const confirmType = ref('password')
const confirmPassword = ref('');

const newUser = ref({
  id: "",
  name: "",
  password: ""
})
const idError = ref(false);
const passError = ref(false);
const confirmError = ref(false);
const nameError = ref(false);

const isValid = computed(() => !idError.value && !passError.value && !confirmError.value && !nameError.value);

//데이터 초기화
const initModal = () => {
  idError.value = false
  passError.value = false;
  confirmError.value = false;
  nameError.value = false;
  newUser.value = {
    id: "",
    name: "",
    password: ""
  }
  inputType.value = 'password';
  confirmType.value = 'password';
  confirmPassword.value = '';
}

// validation 체크
const validateInput = () => {
  //id(이메일) 
  if (!newUser.value.id.trim()) {
    idError.value = "아이디(이메일)을 입력해주세요.";
  } else if (newUser.value.id.trim() && !/^[a-zA-Z0-9._%+-]{1,50}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(newUser.value.id)) {
    idError.value = "올바른 이메일 주소를 입력하세요.";
  } else if (newUser.value.id.length < 9 || newUser.value.id.length > 50) {
    idError.value = "이메일 주소는 9자 이상 50자 이하여야 합니다.";
  } else {
    idError.value = false;
  }

  //비밀번호
  if (!newUser.value.password.trim()) {
    passError.value = "비밀번호를 입력하세요.";
  } else if (newUser.value.password.trim() && !/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,15}$/.test(newUser.value.password)) {
    passError.value = "8~15자 영문, 숫자, 특수문자를 사용하세요";
  } else {
    passError.value = false
  }

  //비밀번호 확인
  if (!confirmPassword.value.trim()) {
    confirmError.value = "비밀번호를 입력하세요.";
  } else if(confirmPassword.value != newUser.value.password) {
    confirmError.value = "비밀번호가 일치하지 않습니다.";
  } else {
    confirmError.value = false
  }

  //이름
  if (!newUser.value.name.trim()) {
    nameError.value = "이름을 입력하세요.";
  } else if(newUser.value.id.trim() && !/^(?![a-zA-Z0-9._%+-]{9,50}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/.test(newUser.value.name)) {
    nameError.value = ": 이름을 올바르게 입력하세요. (숫자, 특수문자, 공백 입력불가)";
  } else {
    nameError.value = false
  }
};

watchEffect(() => {
  validateInput();
})


const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const changeInputType = (field) => {
  if (field === 'inputType') {
    inputType.value = inputType.value === 'password' ? 'text' : 'password';
  } else if (field === 'confirmType') {
    confirmType.value = confirmType.value === 'password' ? 'text' : 'password';
  }
};

const create = async() => {
  try {
    // 이메일 중복체크
    const res1 = await getisExistEmail({email: newUser.value.id});
    if(res1.result){
      idError.value = "이미 사용 중인 이메일입니다. 다른 이메일을 입력하세요.";
      return;
    } else {
      idError.value = false;
    }

    // 사용자 생성
    const params = {name: newUser.value.name, email: newUser.value.id, password: newUser.value.password, repeat_password: confirmPassword.value };
    const res2 = await createUser(params);
    if(res2.result) { 
      alert('사용자 생성이 완료되었습니다.');
      closeModal();
      initModal();
    } else {
      initModal();
      showErrorModal();
    }
  } catch (error) {
    console.error(error);
    initModal();
    showErrorModal();
  }
}
</script>
