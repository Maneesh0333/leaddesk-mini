import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { leadSchema } from "../schemas/leadForm";
import type { LeadFormData } from "../types/leadForm";
import { useLeadForm } from "../hooks/useLead";



const LeadForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: "onChange"
  });

   const { mutate, isPending } = useLeadForm();

   const onSubmit = (data: LeadFormData) => {
   mutate(data);
   console.log("Data: ", data)
 };

  return (
    <section
      id="contact"
      className="bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-3xl bg-white p-10 shadow-xl">
          <div className="text-center">
            <span className="rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-600">
              Get Started
            </span>

            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              Let's Discuss Your Project
            </h2>

            <p className="mt-4 text-gray-600">
              Fill out the form below and we'll get back to you shortly.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >
            {/* Name */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                {...register("name")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Budget */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Project Budget
              </label>

              <select
                {...register("budget")}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Select Budget</option>
                <option value="< ₹50,000">&lt; ₹50,000</option>
                <option value="₹50,000 - ₹2,00,000">
                  ₹50,000 - ₹2,00,000
                </option>
                <option value="₹2,00,000 - ₹5,00,000">
                  ₹2,00,000 - ₹5,00,000
                </option>
                <option value="> ₹5,00,000">&gt; ₹5,00,000</option>
              </select>

              {errors.budget && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.budget.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Project Details
              </label>

              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                {...register("message")}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              {errors.message && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isPending || !isValid}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
            >
              {isPending ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;