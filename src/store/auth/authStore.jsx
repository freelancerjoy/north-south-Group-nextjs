// // src/store/auth/authStore.js
// import { create } from "zustand"; // ✅ correct

// import {
//   apiRegister,
//   apiLogin,
//   apiLoadUser,
//   apiLogout,
// } from "./authApi";

// export const useAuthStore = create((set) => ({
//   isLoading: false,
//   user: null,
//   error: null,
//   message: "",
//   status: '',
//   isLoggedIn: false,

//   // REGISTER
//   regUser: async (auth) => {
//     set({ isLoading: true, success: false });

//     try {
//       const data = await apiRegister(auth);

//       set({
//         isLoading: false,
//         isLoggedIn: true,
//         user: data.user,
//         message: data.message,
//         error: null,
//         success: true,
//       });
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error?.response?.data?.message || "Unknown Error",
//         user: null,
//         success: false,
//         isLoggedIn: false,
//       });
//     }
//   },

//   // LOGIN
// loginUser: async (auth) => {
//   set({ isLoading: true });
//   try {
//     const data = await apiLogin(auth); // data has token, message, user

//     // Store token in localStorage
//     if (data?.token) {
//       localStorage.setItem("token", data.token);
//     }

//     // Optional: store user info
//     if (data?.user) {
//       localStorage.setItem("user", JSON.stringify(data.user));
//     }

//     set({
//       isLoading: false,
//       isLoggedIn: true,
//       user: data.user,
//       message: data.message, // ✅ make sure this line is here
//       error: null,
//     });

//     return data; // 🔹 return data so you can access message on login
//   } catch (error) {
//     set({
//       isLoading: false,
//       error: error?.response?.data?.message || "Unknown Error",
//       isLoggedIn: false,
//     });
//     return null;
//   }
// },

//   // LOAD USER
//   loadUser: async () => {
//     set({ isLoading: true });

//     try {
//       const userData = await apiLoadUser();

//       set({
//         isLoading: false,
//         isLoggedIn: true,
//         user: userData,
//         error: null,
//       });
//     } catch (error) {
//       set({
//         isLoading: false,
//         error: error?.response?.data?.message || "Unknown Error",
//         isLoggedIn: false,
//         user: null,
//       });
//     }
//   },

//   // LOGOUT
// logoutUser: async () => {
//   set({ isLoading: true });

//   try {
//     const message = await apiLogout(); // <-- backend message

//     // Clear storage
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     set({
//       isLoading: false,
//       isLoggedIn: false,
//       user: null,
//       message,
//       error: null,
//     });

//     return message;   // <-- MUST RETURN THIS
//   } catch (error) {
//     const errMsg = error?.response?.data?.message || "Unknown Error";

//     set({
//       isLoading: false,
//       error: errMsg,
//     });

//     throw errMsg;
//   }
// },

//   // CLEAR ERROR
//   clearError: () => set({ error: null }),

//   // CLEAR MESSAGE
//   clearMessage: () => set({ message: "" }),
// }));

// src/store/auth/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { apiRegister, apiLogin, apiLoadUser, apiLogout, apiUpdateProfile } from "./authApi";

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoading: false,
      user: null,
      error: null,
      message: "",
      status: "",
      isLoggedIn: false,

      // REGISTER
      regUser: async (auth) => {
        set({ isLoading: true, success: false });

        try {
          const data = await apiRegister(auth);

          set({
            isLoading: false,
            isLoggedIn: true,
            user: data.user,
            message: data.message,
            error: null,
            success: true,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error?.response?.data?.message || "Unknown Error",
            user: null,
            success: false,
            isLoggedIn: false,
          });
        }
      },

      // LOGIN
      loginUser: async (auth) => {
        set({ isLoading: true });

        try {
          const data = await apiLogin(auth);

          // persist middleware automatically saves user + token
          set({
            isLoading: false,
            isLoggedIn: true,
            user: data.user,
            token: data.token,
            message: data.message,
            error: null,
          });

          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error?.response?.data?.message || "Unknown Error",
            isLoggedIn: false,
          });
          return null;
        }
      },

      // LOAD USER
      loadUser: async () => {
        set({ isLoading: true });

        try {
          const userData = await apiLoadUser();

          set({
            isLoading: false,
            isLoggedIn: true,
            user: userData,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error?.response?.data?.message || "Unknown Error",
            isLoggedIn: false,
            user: null,
          });
        }
      },
      // LOGOUT
      logoutUser: async () => {
        set({ isLoading: true });

        try {
          const message = await apiLogout();

          set({
            isLoading: false,
            isLoggedIn: false,
            user: null,
            token: null,
            message,
            error: null,
          });

          // 🔥 VERY IMPORTANT: Remove persisted state
          localStorage.removeItem("auth-storage");

          return message;
        } catch (error) {
          const errMsg = error?.response?.data?.message || "Unknown Error";

          set({
            isLoading: false,
            error: errMsg,
          });

          throw errMsg;
        }
      },

      clearError: () => set({ error: null }),
      clearMessage: () => set({ message: "" }),

      // UPDATE PROFILE
      updateProfile: async (formData) => {
        set({ isLoading: true });
        try {
          const data = await apiUpdateProfile(formData);
          set({
            isLoading: false,
            user: data.data,
            message: data.message,
            error: null,
          });
          return data;
        } catch (error) {
          set({
            isLoading: false,
            error: error?.response?.data?.message || "Update failed",
          });
          throw error;
        }
      },
    }),

    {
      name: "auth-storage", // LocalStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
