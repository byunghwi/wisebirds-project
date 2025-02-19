<template>
  <div class="mx-auto">
    <!-- 상단 바 -->
    <header class="flex justify-between items-center bg-gray-300 text-gray-700 p-4">
      <h2 class="text-lg font-semibold">사용자 관리</h2>
    </header>

    <div>
      <button @click="openUserModal('create')">생성</button>
    </div>

    <!-- 사용자 리스트 -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2 border">아이디</th>
            <th class="p-2 border">이름</th>
            <th class="p-2 border">마지막 로그인 일시</th>
            <th class="p-2 border">수정</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedUsers" :key="index" class="text-center">
            <td class="p-2 border text-left">{{ user.email }}</td>
            <td class="p-2 border text-left">{{ user.name }}</td>
            <td class="p-2 border text-left">{{ formattedTime(user.last_login_at) }}</td>
            <td class="p-2 border text-center"><button @click="openUserModal('modify')">수정</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <Pagination :totalPages="totalPages" :currentPage="currentPage" @update:currentPage="currentPage = $event" />
  </div>
  <!-- createUserModal -->
  <CreateUserModal v-if="modalType=='create'" :isOpen="isModalOpen" @close="closeModal" />
  <ModifyUserModal v-if="modalType=='modify'" :isOpen="isModalOpen" @close="closeModal" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";
import CreateUserModal from "@/components/CreateUserModal.vue";
import ModifyUserModal from "@/components/ModifyUserModal.vue";
import { getUserList } from "@/api/users"
import dayjs from 'dayjs'
import { storeToRefs } from 'pinia'
import { useModalStore } from "@/stores/modal.js";

const storeModal = useModalStore();
const { isModalOpen } = storeToRefs(storeModal);
const { closeModal } = storeModal;

// 사용자 역할 선택
const selectedOption = ref("어드민");

// 사용자자 데이터
const users = ref([
  {
     "id":1,
     "email":"user1@wisebirds.ai",
     "name":"사용자1",
     "last_login_at":"2022-11-14T07:37:24.914Z"
  },
  {
     "id":2,
     "email":"user2@wisebirds.ai",
     "name":"사용자1",
     "last_login_at":"2022-11-14T07:37:24.914Z"
  },
  {
     "id":3,
     "email":"user3@wisebirds.ai",
     "name":"사용자2",
     "last_login_at":"2022-11-14T07:37:24.914Z"
  },
  {
     "id":4,
     "email":"user3@wisebirds.ai",
     "name":"사용자3",
     "last_login_at":"2022-11-14T07:37:24.914Z"
  },
  {
     "id":4,
     "email":"user3@wisebirds.ai",
     "name":"사용자3",
     "last_login_at":"2022-11-14T07:37:24.914Z"
  },
  {
     "id":4,
     "email":"user3@wisebirds.ai",
     "name":"사용자3",
     "last_login_at":"2022-11-14T07:37:24.914Z"
  },
  {
     "id":4,
     "email":"user3@wisebirds.ai",
     "name":"사용자3",
     "last_login_at":"2022-11-14T07:37:24.914Z"
  },
]);

const modalType = ref(null);

// 페이지네이션 상태
const currentPage = ref(1);
const itemsPerPage = 5;

// 총 페이지 수 계산
const totalPages = computed(() => Math.ceil(users.value.length / itemsPerPage));

// 현재 페이지의 캠페인 데이터 가져오기
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return users.value.slice(start, start + itemsPerPage);
});

const formattedTime = (time) => {
  return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '';
};

const openUserModal = (type) => {
  modalType.value = type;
  isModalOpen.value = true;
}

onMounted(async() => {
  //const res = await getUserList();
})
</script>