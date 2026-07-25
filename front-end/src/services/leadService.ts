import type { LeadPayload, UpdateLeadPayload } from "../interface/lead";
import { Api } from "./api";

export const createLead = async (payload: LeadPayload) => {
  const { data } = await Api.post("/leads", payload);
  return data;
};

export const getLeads = async (search?: string) => {
  const { data } = await Api.get("/leads", {
    params: {
      search,
    },
  });

  return data;
};

export const updateLeadStatus = async (
  {id, status}: UpdateLeadPayload
) => {
  const { data } = await Api.patch(`/leads/${id}`, {
    status,
  });

  return data;
};