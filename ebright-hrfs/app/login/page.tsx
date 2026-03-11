"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // we'll use uncontrolled inputs instead of React state to rule out
  // a state-related issue; you can read values out of the form on submit.
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
        // navigate to dashboard home after sign-in
        router.push("/home");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[320px] p-8 bg-white rounded shadow"
      >
        <h1 className="text-2xl font-semibold mb-6">Login</h1>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">
            Username
          </span>
          <input
            name="username"
            type="text"
            required
            className="mt-1 block w-full rounded border-gray-300"
            onChange={(e) => console.log('typing username', e.target.value)}
            autoFocus
          />
        </label>

        <label className="block mb-6">
          <span className="block text-sm font-medium text-gray-700">
            Password
          </span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded border-gray-300"
            onChange={(e) => console.log('typing password', e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
