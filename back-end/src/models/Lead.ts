import { Schema, model, Document } from "mongoose";

export type LeadStatus = "New" | "Contacted" | "Closed";

export interface ILead extends Document {
  name: string;
  email: string;
  budget: string;
  message: string;
  status: LeadStatus;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    budget: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default model<ILead>("Lead", leadSchema);