import type { LoginPayload } from "../interface/login";
import { Api } from "./api";

export const login = async (payload: LoginPayload) => {
  const { data } = await Api.post("/auth/login", payload);
  return data;
};

export const logout = async () => {
  const { data } = await Api.post("/auth/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await Api.get("/auth/me");
  return data;
};
