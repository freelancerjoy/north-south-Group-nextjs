import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";

export default function ClientApp() {
  useEffect(() => {
    try {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        if (parsed.state?.isLoading === true) {
          localStorage.removeItem("auth-storage");
        }
      }
    } catch (e) {
      localStorage.removeItem("auth-storage");
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={1000}
      />
      <App />
    </BrowserRouter>
  );
}
