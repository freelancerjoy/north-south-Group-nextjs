import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuthStore } from "../../store/auth/authStore.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useReveal from "../../components/useReveal";
import { FaSpinner } from "react-icons/fa"; 


const Login = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, isLoading } = useAuthStore();
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      if (data) {
        // console.log("Frontend login response:", data); 
         toast.success(data.message || "Login Successful");
        navigate("/");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("SignIn error:", error);
      // toast.error(error || "Login failed");
    }
  };

  const ref = useReveal();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {isLoading ? (
      <div className="w-full h-screen flex justify-center items-center">
    <div> <FaSpinner className="animate-spin" size={50}/></div>
  </div>
      ) : (
        <form
          onSubmit={signIn}
          className="w-full max-w-sm flex flex-col justify-center items-center"
        >
          <h2
            ref={ref}
            className={`slide-title ${className} text-xl font-bold py-4`}
          >
            Sign In Your Account
          </h2>

          <TextField
            type="email"
            placeholder="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            type="password"
            placeholder="Password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              color: "white",
              background: "#0f7771",
              "&:hover": { backgroundColor: "#1e2a60" },
              mt: 2,
            }}
          >
            Sign In
          </Button>
        </form>
      )}
    </div>
  );
};

export default Login;
