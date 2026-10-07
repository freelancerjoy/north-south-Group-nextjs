import apiInstance from "../../config/axios";

export const getHomeContentApi = async () => (await apiInstance.get("/homeContent")).data;
export const updateHomeContentApi = async (content) => (await apiInstance.put("/homeContent", { content })).data;
