"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Loader2, ArrowRight } from "lucide-react"; // Install lucide-react

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") || "");
    const password = String(formData.get("password") || "");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        const data = await res.json().catch(() => ({}));
        alert((data as any).error || "Login failed");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="w-full max-w-[440px] z-10 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl"
        >
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 mb-6 shadow-lg shadow-blue-500/20">
              <Lock className="text-white w-8 h-8" />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h1>
            <p className="text-slate-400 mt-3 text-sm">Enter your credentials to access your account</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 ml-1">
                Username
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="username"
                  type="text"
                  required
                  placeholder="jdoe123"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Password
                </label>
                <button type="button" className="text-[11px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-tight">
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-blue-400 font-semibold hover:underline">Create one</a>
          </p>
        </form>
      </div>
    </div>
  );
}
// try commit