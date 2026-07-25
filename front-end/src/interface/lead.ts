export interface LeadPayload {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export interface UpdateLeadPayload {
  id: string,
  status: string
}

export type LeadStatus = "New" | "Contacted" | "Closed";

export interface Lead {
  _id: string;
  name: string;
  email: string;
  budget: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeadsResponse {
  success: boolean;
  message: string;
  data: {
    count: number;
    leads: Lead[];
  };
}