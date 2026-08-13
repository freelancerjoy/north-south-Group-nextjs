import apiInstance from "../../config/axios";

export const getContactInfoApi = async () => {
  const response = await apiInstance.get("/contactInfo");
  return response.data;
};

export const updateContactInfoApi = async (data) => {
  const response = await apiInstance.put("/contactInfo", data);
  return response.data;
};
