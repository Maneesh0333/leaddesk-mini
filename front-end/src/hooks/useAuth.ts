import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, logout } from "../services/authService";
import type { ResponseType } from "../types/common";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getMe,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation<ResponseType, AxiosError<ResponseType>>({
    mutationFn: logout,
    onSuccess: (data) => {
       if (!data.success) {
        toast.error(data.message || "Logout Failed.");
        return;
      }
      localStorage.removeItem("token");
      toast.success("Logout successful!");
      navigate("/login");
    },
    onError: (err) => {
      if (!err.response) {
        toast.error("Network error. Please check your internet connection.");
        return;
      }
      
      toast.error(err.response.data.message || "Logout Failed.");
    },
  });
};