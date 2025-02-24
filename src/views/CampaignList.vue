<template>
  <div class="px-8 h-full flex flex-col">
    <!-- 상단 바 -->
    <header class="flex justify-between items-center text-gray-700 p-4">
      <h2 class="text-lg font-bold">캠페인 관리</h2>
    </header>

    <!-- 캠페인 리스트 -->
    <!-- <div class="flex-1 overflow-y-auto"> -->
    <div class="flex-1 overflow-y-auto">
      <table class="w-full border-collapse">
        <thead class="text-gray-500 border-t-1 border-b-1 border-gray-300">
          <tr>
            <th class="p-1 w-[5%]">상태</th>
            <th class="p-1 w-[15%] text-left">캠페인명</th>
            <th class="p-1 w-[20%] text-left">캠페인 목적</th>
            <th class="p-1 w-[10%] text-right">노출수</th>
            <th class="p-1 w-[10%] text-right">클릭수</th>
            <th class="p-1 w-[10%] text-right">CTR</th>
            <th class="p-1 w-[10%] text-right">동영상조회수</th>
            <th class="p-1 w-[10%] text-right">VTR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(campaign, index) in paginatedCampaigns" :key="index"
            class="text-center text-gray-700 border-b-1 border-gray-300">
            <td class="p-1 text-center">
              <label
                :class="['inline-flex items-center', !['admin', 'manager'].includes(currentAuth) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer']">
                <input type="checkbox" v-model="campaign.enabled" class="sr-only peer"
                  :disabled="!['admin', 'manager'].includes(currentAuth)">
                <div
                  class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-400 dark:peer-focus:ring-blue-400 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-400 dark:peer-checked:bg-blue-400">
                </div>
              </label>
            </td>
            <td class="p-1 text-left">{{ campaign.name }}</td>
            <td class="p-1  text-left">{{ parseCampaignObjective(campaign.campaign_objective) }}</td>
            <td class="p-1  text-right">{{ campaign.impressions.toLocaleString() }}</td>
            <td class="p-1  text-right">{{ campaign.clicks.toLocaleString() }}</td>
            <td class="p-1  text-right">{{ campaign.ctr.toFixed(2) }}%</td>
            <td class="p-1  text-right">{{ campaign.video_views }}</td>
            <td class="p-1  text-right">{{ campaign.vtr.toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 페이지네이션 -->
    <div class="sticky bottom-0 left-0 w-full py-2">
      <Pagination :totalPages="totalPages" :currentPage="currentPage" @update:currentPage="currentPage = $event" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getCampaignList } from "@/api/campaigns"
import { useMainStore } from "@/stores/main.js";
import { storeToRefs } from "pinia";
import { useModalStore } from "@/stores/modal";
const storeModal = useModalStore();
const { showErrorModal } = storeModal;
const storeMain = useMainStore();
const { currentAuth } = storeToRefs(storeMain);
import Pagination from "@/components/Pagination.vue"; // Pagination
import { itemsPerPage } from "@/lib/constants";

const campaigns = ref([]);

// 페이지네이션 상태
const currentPage = ref(1);

// 총 페이지 수 계산
const totalPages = computed(() => Math.ceil(campaigns.value.length / itemsPerPage));

// 캠페인 목적 파싱
const parseCampaignObjective = (campaignObjective) => {
  switch (campaignObjective) {
    case "WEBSITE_CONVERSIONS":
      return "웹사이트 전환";
    case "WEBSITE_TRAFFIC":
      return "웹사이트 트래픽";
    case "SALES":
      return "판매";
    case "APP_INSTALLATION":
      return "앱설치";
    case "LEAD":
      return "리드";
    case "BRAND":
      return "브랜드 인지도 및 도달 범위";
    case "VIDEO_VIEWS":
      return "동영상 조회";
    default:
      return "";
  }
};

// 현재 페이지의 캠페인 데이터 가져오기
const paginatedCampaigns = computed(() => {
  if(campaigns.value.length) {
    const start = (currentPage.value - 1) * itemsPerPage;
    return campaigns.value.slice(start, start + itemsPerPage);
  } else {
    return [];
  }
});

onMounted(async()=>{
  try {
    const res = await getCampaignList(currentPage.value, itemsPerPage);  
    campaigns.value = res.content;
  } catch (error) {
    showErrorModal();
  }
  
})
</script>