// src/store/auth/authApi.js
import apiInstance from "../../config/axios";

// REGISTER
export const apiRegister = async (auth) => {
  const { data } = await apiInstance.post("/user/registration", auth);
  return data;
};

// LOGIN
export const apiLogin = async (auth) => {
  const res = await apiInstance.post("/user/login", auth);
  return res.data; // ⬅️ THIS FIXES YOUR ISSUE
};


// LOAD USER
export const apiLoadUser = async () => {
  const { data } = await apiInstance.get("user/me");
  return data.data;
};

// LOGOUT
export const apiLogout = async () => {
  const res = await apiInstance.get("/user/logout");
  return res.data || data.message;
};

// UPDATE PROFILE
export const apiUpdateProfile = async (formData) => {
  const { data } = await apiInstance.put("/user/update-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
