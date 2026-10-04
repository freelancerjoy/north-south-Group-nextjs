import apiInstance from "../../config/axios";

export const getAboutContentApi = async () => {
  const response = await apiInstance.get("/about", {
    params: { _ts: Date.now() },
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
    },
  });
  return response.data;
};

export const updateAboutContentApi = async (payload) => {
  const response = await apiInstance.put("/about", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
