<template>
  <div class="bg-blue-500 text-white flex justify-between items-center w-full px-6 h-[50px] fixed">
    <!-- 좌측: 로고 및 탭 메뉴 -->
    <div class="flex items-center">
      <RouterLink to="/" class="flex items-center text-xl font-bold pr-4 hover:text-gray-300"><img src="https://cdn.imweb.me/thumbnail/20240208/f26300940b407.png" alt="Wisebirds 로고" class="w-8 h-8 mr-2">Wisebirds</RouterLink>
      <RouterLink to="/campaigns" :class="`px-3 font-semibold hover:text-gray-300 
      ${$route.path === '/campaigns' ? 'text-yellow-400 font-bold border-b-2 border-yellow-40' : ''}`">
        캠페인
      </RouterLink>
      <RouterLink v-if="isAdmin" to="/users" :class="`px-3 font-semibold hover:text-gray-300 
      ${$route.path === '/users' ? 'text-yellow-400 font-bold border-b-2 border-yellow-400' : ''}`">사용자</RouterLink>
    </div>

    <!-- 우측: 사용자 정보 및 역할 선택 -->
    <div class="flex items-center pr-2">
      <div class="cursor-pointer hover:text-gray-300 flex items-center pr-6" @click.stop="togglePopup">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M5.121 17.804A3 3 0 017 17h10a3 3 0 012.121.804M12 14a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
        <span>{{ userInfo.email }}</span>
      </div>
      <!-- 사용자 정보 팝업 -->
      <div v-if="showPopup" ref="popup"
        class="absolute top-11 right-30 bg-white shadow-lg rounded-lg p-4 w-52 border border-gray-200">
        <div class="text-center text-gray-600 font-bold text-lg">{{ userInfo.name }}</div>
        <div class="text-center text-gray-600">{{ userInfo.email }}</div>
        <div class="text-center text-gray-400">{{ userInfo.company.name }}</div>
      </div>

      <select v-model="currentAuth" @change="changeRole" class="bg-white text-gray-800 px-3 py-1 rounded">
        <option value="admin">어드민</option>
        <option value="manager">매니저</option>
        <option value="viewer">뷰어</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia'
import { getUserInfo } from '@/api/users';
import { useMainStore } from "@/stores/main.js";
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';

import router from '@/router';

const storeModal = useModalStore();
const { showErrorModal } = storeModal;

const storeMain = useMainStore();
const { currentAuth } = storeToRefs(storeMain);

const storeUser = useUserStore();
const { userInfo } = storeToRefs(storeUser);

//const showUserInfo = ref(false);

const isAdmin = computed(() => currentAuth.value === 'admin');
const popup = ref(null);
const showPopup = ref(false);

const togglePopup = () => {
 showPopup.value = !showPopup.value
}

const changeRole = () => {
  //console.log(`auth: ${currentAuth.value}, isAdmin: ${isAdmin.value},`);
  if (currentAuth.value !== 'admin' && router.currentRoute.value.path == '/users') {
    router.replace("/");
  }
};

const handleClickOutside = (event) => {
  if (popup.value && !popup.value.contains(event.target)) {
    console.log('handleClickOutside: ', popup.value, '-------------', event.target);
    showPopup.value = false;
  }
};

onMounted(async() => {
  try {
    const resUSer = await getUserInfo();
    userInfo.value = resUSer;  
  } catch (error) {
    console.error(error);
    showErrorModal();
  }
  
  document.addEventListener("click", handleClickOutside);
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>