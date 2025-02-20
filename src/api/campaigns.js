import axios from "axios";
import { base_url } from "@/lib/constants";

// 캠페인 리스트 조회
export const getCampaignList = async (params) => {
  const page = params?.page || 1;
  const size = params?.size || 25; 
  try {
    const response = await axios.get(`${base_url}/campaigns`, {
      params: {
        page,
        size
      }
    });
    return response.data;
  } catch (error) {
    console.error("캠페인 정보를 받아오는 중 에러가 발생했습니다 ", error.response?.data || error.message);
    throw error;
  }
};

// 캠페인 상태 수정
export const modifyCampaign = async (params) => {
  try {
    const id = params.id;
    const enabled = params.enabled;
    const response = await axios.patch(`${base_url}/campaigns/${id}`, { enabled });
    return response.data;
  } catch (error) {
    console.error("캠페인 상태 수정 중 에러가 발생했습니다:", error.response?.data || error.message);
    throw error;
  }
};