<template>
  <div class="bg-gray-800 text-white flex justify-between items-center w-full px-6 py-3 fixed top-0 left-0">
    <!-- 좌측: 로고 -->
    <div class="text-xl font-bold">Wisebirds</div>

    <!-- 가운데: 메뉴 버튼 -->
    <div class="flex space-x-4">
      <RouterLink to="/campaigns" class="hover:text-gray-300">캠페인</RouterLink>
      <RouterLink v-if="isAdmin" to="/users" class="hover:text-gray-300">사용자</RouterLink>
    </div>

    <!-- 우측: 사용자 정보 및 Select 박스 -->
    <div class="flex items-center space-x-4">
      <span class="cursor-pointer" @click="showUserInfo = true">{{ userId }}</span>
      <select v-model="selectedRole" @change="changeRole" class="bg-gray-700 text-white px-2 py-1 rounded">
        <option value="admin">어드민</option>
        <option value="manager">매니저</option>
        <option value="viewer">뷰어</option>
      </select>
    </div>

    <!-- 내 정보 팝업 -->
    <!-- <UserInfoPopup v-if="showUserInfo" @close="showUserInfo = false" /> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// import UserInfoPopup from '@/components/UserInfoPopup.vue';

const userId = ref('user@example.com');
const selectedRole = ref('admin');
const showUserInfo = ref(false);

const isAdmin = computed(() => selectedRole.value === 'admin');

const changeRole = () => {
  if (selectedRole.value !== 'admin') {
    window.location.href = "/campaigns"; // 사용자 메뉴 접근 차단
  }
};
</script>