import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login";
import type { LoginFormData } from "../types/login";
import { useLogin } from "../hooks/useLogin";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginFormData) => {
  mutate(data);
  console.log("Data: ", data)
};

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-6">
      {/* Background Blur */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-indigo-600"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        {/* Heading */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
            <Lock size={30} />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Admin Login
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to manage your leads.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
        >
          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-indigo-600 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending || !isValid}
            className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
          >
            {isPending ? (
              <>
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-gray-500">
          Secure admin access for LeadDesk Mini
        </p>
      </div>
    </div>
  );
};

export default Login;