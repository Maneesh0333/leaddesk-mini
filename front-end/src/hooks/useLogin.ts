import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ResponseType } from "../types/common";
import type { LoginPayload } from "../interface/login";
import { login } from "../services/authService";

type LoginResponse = ResponseType & {
    data: {
      token: string
    },
}

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation<LoginResponse, AxiosError<ResponseType>, LoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Invalid credentials, please try again.");
        return;
      }
      
      toast.success("Welcome back!");
      localStorage.setItem("token", data.data.token)
      navigate("/admin");
    },
    onError: (err) => {
      if (!err.response) {
        toast.error("Network error. Please check your internet connection.");
        return;
      }
      
      toast.error(err.response.data.message || "Login failed. Please try again.");
    },
  });
};
