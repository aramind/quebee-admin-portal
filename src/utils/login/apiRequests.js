import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCourseByParams = async (params) => {
  try {
    const response = await axios.get(`${API_URL}/courses${params}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
