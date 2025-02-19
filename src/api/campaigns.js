import axios from "axios";
import { base_url } from "@/lib/constants";

// 캠페인 리스트 조회
export const getCampaignList = async (params) => {
  const page = params.page || 1;
  const size = params.size; 
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

//   {
//     "content":[
//        {
//           "id":1,
//           "name":"캠페인1",
//           "enabled":true,
//           "campaign_objective":"WEBSITE_TRAFFIC",
//           "impressions":384057,
//           "clicks":1974,
//           "ctr":0.8752,
//           "video_views":948,
//           "vtr":0.95123
//        },
//        {
//           "id":2,
//           "name":"캠페인2",
//           "enabled":true,
//           "campaign_objective":"LEAD",
//           "impressions":705575,
//           "clicks":6726,
//           "ctr":0.8733,
//           "video_views":40,
//           "vtr":0.135
//        },
//        {
//           "id":3,
//           "name":"캠페인3",
//           "enabled":true,
//           "campaign_objective":"LEAD",
//           "impressions":538086,
//           "clicks":1171,
//           "ctr":0.3833,
//           "video_views":512,
//           "vtr":0.2512
//        },
//      ...
//     ],
//     "size": 25,
//     "total_elements": 2,
//     "total_pages": 1, 
//     ...
//     }