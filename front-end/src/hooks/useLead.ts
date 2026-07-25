import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { ResponseType } from "../types/common";
import type { LeadFormData } from "../types/leadForm";
import { createLead, getLeads, updateLeadStatus } from "../services/leadService";
import type { LeadsResponse, UpdateLeadPayload } from "../interface/lead";


export const useLeads = (search: string) => {
  return useQuery<LeadsResponse, AxiosError<ResponseType>>({
    queryKey: ["leads", search],
    queryFn: () => getLeads(search),
  });
};

export const useUpdateLeadStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, AxiosError<ResponseType>, UpdateLeadPayload>({
    mutationFn: updateLeadStatus,

    onSuccess: (data) => {
       if (!data.success) {
        toast.error(data.message || "Failed to update lead status.");
        return;
      }
      toast.success("Lead updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
    onError: (err) => {
      if (!err.response) {
        toast.error("Network error. Please check your internet connection.");
        return;
      }
      
      toast.error(err.response.data.message || "Failed to update lead status.");
    },
  });
};

export const useLeadForm = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, AxiosError<ResponseType>, LeadFormData>({
    mutationFn: createLead,
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message || "Something went wrong!");
        return;
      }
      
      toast.success("Lead created successfully!");
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
    onError: (err) => {
      if (!err.response) {
        toast.error("Network error. Please check your internet connection.");
        return;
      }
      
      toast.error(err.response.data.message || "Failed to create lead.");
    },
  });
};

