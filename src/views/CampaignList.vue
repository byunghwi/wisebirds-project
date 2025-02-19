<template>
  <div class="mx-auto">
    <!-- 상단 바 -->
    <header class="flex justify-between items-center bg-gray-300 text-gray-700 p-4">
      <h2 class="text-lg font-semibold">캠페인 관리</h2>
    </header>

    <!-- 캠페인 리스트 -->
    <div class="overflow-x-auto mt-4">
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr class="bg-gray-100 text-gray-700">
            <th class="p-1 border">상태</th>
            <th class="p-1 border text-left">캠페인명</th>
            <th class="p-1 border text-left">캠페인 목적</th>
            <th class="p-1 border text-right">노출수</th>
            <th class="p-1 border text-right">클릭수</th>
            <th class="p-1 border text-right">CTR</th>
            <th class="p-1 border text-right">일일캠페인수</th>
            <th class="p-1 border text-right">VTR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(campaign, index) in paginatedCampaigns" :key="index" class="text-center even:bg-gray-50">
            <td class="p-1 border text-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="campaign.active" class="sr-only peer" :disabled="campaign.disabled" />
                <div
                  class="w-11 h-6 bg-gray-300 rounded-full transition-all peer-checked:bg-blue-500 peer-checked:disabled:bg-gray-400">
                </div>
              </label>
            </td>
            <td class="p-1 border text-left">{{ campaign.name }}</td>
            <td class="p-1 border text-left">{{ campaign.purpose }}</td>
            <td class="p-1 border text-right">{{ campaign.exposure.toLocaleString() }}</td>
            <td class="p-1 border text-right">{{ campaign.clicks.toLocaleString() }}</td>
            <td class="p-1 border text-right">{{ Math.round(campaign.ctr) }}%</td>
            <td class="p-1 border text-right">{{ campaign.dailyCampaigns }}</td>
            <td class="p-1 border text-right">{{ Math.round(campaign.vtr) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 페이지네이션 -->
    <div class="fixed bottom-10 left-1/2 transform -translate-x-1/2">
      <Pagination :totalPages="totalPages" :currentPage="currentPage" @update:currentPage="currentPage = $event" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getCampaignList } from "@/api/campaigns"
import Pagination from "@/components/Pagination.vue"; // Pagination

// 사용자 역할 선택
const selectedOption = ref("어드민");

// 캠페인 데이터
const campaigns = ref([
  { active: true, name: "캠페인1", purpose: "웹사이트 트래픽", exposure: 681359, clicks: 5318, ctr: 81, dailyCampaigns: 214, vtr: 23 },
  { active: false, name: "캠페인2", purpose: "영상형 조회", exposure: 212524, clicks: 6535, ctr: 25, dailyCampaigns: 368, vtr: 53 },
  { active: true, name: "캠페인3", purpose: "웹사이트 전환", exposure: 387097, clicks: 6593, ctr: 65, dailyCampaigns: 461, vtr: 66 },
  { active: false, name: "캠페인4", purpose: "웹사이트 전환", exposure: 97121, clicks: 84, ctr: 5, dailyCampaigns: 946, vtr: 44 },
  { active: true, name: "캠페인5", purpose: "판매", exposure: 400676, clicks: 2928, ctr: 5, dailyCampaigns: 992, vtr: 21 },
  { active: false, name: "캠페인6", purpose: "판매", exposure: 814261, clicks: 9085, ctr: 18, dailyCampaigns: 254, vtr: 85 },
  { active: true, name: "캠페인7", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: false, name: "캠페인8", purpose: "판매", exposure: 814261, clicks: 9085, ctr: 18, dailyCampaigns: 254, vtr: 85 },
  { active: true, name: "캠페인9", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: false, name: "캠페인10", purpose: "판매", exposure: 814261, clicks: 9085, ctr: 18, dailyCampaigns: 254, vtr: 85 },
  { active: true, name: "캠페인11", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인12", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인13", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인14", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인15", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인16", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인17", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인18", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인19", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인20", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인21", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인22", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인23", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인24", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인25", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인26", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인27", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인28", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인29", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인30", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인31", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인32", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인33", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인34", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인35", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인36", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인37", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인38", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인39", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  { active: true, name: "캠페인40", purpose: "브랜드 인지도 및 도달 범위", exposure: 108169, clicks: 2532, ctr: 29, dailyCampaigns: 37, vtr: 47 },
  
]);

// 페이지네이션 상태
const currentPage = ref(1);
const itemsPerPage = 25;

// 총 페이지 수 계산
const totalPages = computed(() => Math.ceil(campaigns.value.length / itemsPerPage));

// 현재 페이지의 캠페인 데이터 가져오기
const paginatedCampaigns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return campaigns.value.slice(start, start + itemsPerPage);
});

onMounted(async()=>{
  //campaigns.value = await getCampaignList();
})
</script>