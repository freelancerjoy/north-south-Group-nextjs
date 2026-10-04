import apiInstance from "../../config/axios";

export const getFooterApi = async () => (await apiInstance.get("/footer")).data;
export const updateFooterApi = async (data) => (await apiInstance.put("/footer", data)).data;
