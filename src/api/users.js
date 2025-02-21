import axios from "axios";
import { base_url } from "@/lib/constants"

// 로그인 된 사용자 정보
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${base_url}/auth/me`);
    return response.data;
  } catch (error) {
    console.error("유저 정보를 받아오는 중 에러가 발생했습니다:", error.response?.data || error.message);
    throw error;
  }
};


//사용자 리스트 조회
export const getUserList = async (params) => {
  try {
    const page = params.page;
    const size = params.size;

    const response =  await axios.get(`${base_url}/users`, {
      params: {
        page,
        size
      }
    })
    return response.data;
  } catch (error) {
    console.error("[user] 사용자 리스트 조회 중 error 발생 ", error.response?.data || error.message);
    throw error;
  }
}

//사용자 생성
export const createUser = async (params) => {
  const { name, email, password, repeat_password } = params;

  try {
    const response = await axios.post(`${base_url}/users`, {
      name, email, password, repeat_password
    })
    return response.data;
  } catch (error) {
    console.error("[user] 사용자 생성 중 error 발생 ", error.response?.data || error.message);
    throw error;
  }
}

//사용자 수정
export const modifyUser = async (params) => {
  try {
    const {id, name} = params;
    const response = await axios.patch(`${base_url}/users/${id}`, { name });
    return response.data;
  } catch (error) {
    console.error("사용자 정보 수정 중 에러가 발생했습니다:", error.response?.data || error.message);
    throw error;
  }
}

//사용자 이메일 중복 체크
export const getisExistEmail = async (params) => {
  try {
    const email = params.email;
    const response = await axios.get(`${base_url}/users/${email}/exists`);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 수정 중 에러가 발생했습니다:", error.response?.data || error.message);
    throw error;
  }
}
