import axios from "axios";
import { base_url } from "@/lib/constants"

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${base_url}/auth/me`);
    return response.data;
  } catch (error) {
    console.error("유저 정보를 받아오는 중 에러가 발생했습니다:", error.response?.data || error.message);
    throw error;
  }
};

//   {
//     "id": 1,
//     "email": "abc@abc.com",
//     "name": "홍길동",
//     "company": {
//       "id": 1,
//       "name": "와이즈버즈"
//     }
// }