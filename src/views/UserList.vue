<template>
  <div class="w-[98%] mx-auto h-full">
    <!-- 상단 바 -->
    <header class="flex justify-between items-center border-b-1 border-gray-300 text-gray-700 p-4">
      <h2 class="text-lg font-bold">사용자 관리</h2>
    </header>

    <div class="flex justify-start p-[10px] pl-3">
      <button @click="openUserModal('create')" class="bg-blue-500 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out">
        생성
      </button>
    </div>

    <!-- 사용자 리스트 -->
    <div class="overflow-auto h-[calc(100%-50px)]">
      <table class="w-full border-collapse">
        <thead class="text-gray-500 border-b-1 border-t-1 border-gray-300">
          <tr>
            <th class="p-1 w-[25%] text-left">아이디</th>
            <th class="p-1 w-[25%] text-left">이름</th>
            <th class="p-1 w-[25%] text-left">마지막 로그인 일시</th>
            <th class="p-1 w-[25%] text-center">수정</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="index" class="text-center text-gray-700 border-b-1 border-gray-300">
            <td class="p-1 text-left">{{ user.email }}</td>
            <td class="p-1 text-left">{{ user.name }}</td>
            <td class="p-1 text-left">{{ formattedTime(user.last_login_at) }}</td>
            <td class="p-1 text-center text-blue-400"><button class="cursor-pointer hover:text-blue-600 hover:font-bold" @click="openUserModal('modify', user)">수정</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
         <!-- 페이지네이션 -->
    <div class="fixed bottom-10 left-1/2 transform -translate-x-1/2">
      <Pagination :totalPages="totalPages" :currentPage="currentPage" @update:currentPage="currentPage = $event" />
    </div>
  </div>
  <!-- createUserModal -->
  <CreateUserModal v-if="modalType=='create'" :isOpen="isModalOpen" @close="closeModal" />
  <ModifyUserModal v-if="modalType=='modify'" :isOpen="isModalOpen" :nowUser="selectedUser" @close="closeModal" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";
import CreateUserModal from "@/components/CreateUserModal.vue";
import ModifyUserModal from "@/components/ModifyUserModal.vue";
import { getUserList } from "@/api/users"
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useModalStore } from "@/stores/modal";
import { useUserStore } from "@/stores/user";
import { itemsPerPage } from "@/lib/constants";

const storeModal = useModalStore();
const { isModalOpen } = storeToRefs(storeModal);
const { closeModal, showErrorModal } = storeModal;

const storeUser = useUserStore();
const { userList } = storeToRefs(storeUser);

const modalType = ref(null);

// 페이지네이션 상태
const currentPage = ref(1);

// 현재 선택된 사용자(수정용)
const selectedUser = ref(null);

// 총 페이지 수 계산
const totalPages = computed(() => {
  if(userList.value && userList.value.length) return Math.ceil(userList.value.length / itemsPerPage);
});

// 현재 페이지의 캠페인 데이터 가져오기
const paginatedUsers = computed(() => {
  if(userList.value && userList.value.length) {
    const start = (currentPage.value - 1) * itemsPerPage;
    return userList.value.slice(start, start + itemsPerPage);
  } else {
    return [];
  }
});

const formattedTime = (time) => {
  return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '';
};

const openUserModal = (type, user) => {
  modalType.value = type;
  isModalOpen.value = true;
  selectedUser.value = user;
}

onMounted(async() => {
  try {
    const res = await getUserList(currentPage, itemsPerPage);  
    userList.value = res.content;
  } catch (error) {
    showErrorModal(); // 에러 모달 띄우기 
  }
})
</script>