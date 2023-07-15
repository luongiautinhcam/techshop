import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const getProductCategories = async () => {
  const response = await axios.get(`${base_url}category/`);
  return response.data;
};


const getProductCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, config);
  return response.data;
};


const pCategoryService = {
  getProductCategories,
  getProductCategory,
};

export default pCategoryService;
