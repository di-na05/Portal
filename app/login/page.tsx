"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
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
      console.error(err);
      alert("Network error");
    }
  };

  return (
    /* 1. Added a subtle gradient and better padding for mobile */
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-6">
      <form
        onSubmit={handleSubmit}
        /* 2. Increased border radius, softer shadow, and added a subtle border */
        className="w-full max-w-[400px] p-10 bg-white rounded-2xl shadow-xl shadow-slate-300/50 border border-white"
      >
        {/* 3. Improved typography and added a sub-header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-2">Please enter your details to sign in.</p>
        </div>

        <label className="block mb-5">
          <span className="block text-sm font-semibold text-slate-700 mb-1.5">
            Username
          </span>
          <input
            name="username"
            type="text"
            required
            placeholder="e.g. jdoe123"
            /* 4. Added better padding, focus rings, and transition effects */
            className="block w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            onChange={(e) => console.log('typing username', e.target.value)}
            autoFocus
          />
        </label>

        <label className="block mb-8">
          <span className="block text-sm font-semibold text-slate-700 mb-1.5">
            Password
          </span>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="block w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            onChange={(e) => console.log('typing password', e.target.value)}
          />
        </label>

        <button
          type="submit"
          /* 5. Added a shadow to the button and a "scale" effect when clicked */
          className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-lg shadow-blue-500/30"
        >
          Sign In
        </button>

        {/* 6. Added a "Help/Forgot" footer link */}
        <div className="mt-8 text-center">
          <button type="button" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            Forgot password?
          </button>
        </div>
      </form>
    </div>
  );
}

