"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Request failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 p-4 text-white md:p-6">
    {/* Visual background element */}
    <div className="absolute top-0 h-80 w-full bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl" />

    {/* The Card: Changed max-w-sm to max-w-md and p-8 to responsive p-6 md:p-10 */}
    <div className="relative w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur-md md:p-10">
      
      <div className="mb-6">
        {/* Pro Plan Pill */}
        <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 border border-blue-500/20">
          PRO PLAN
        </span>
        {/* Responsive Title: text-3xl on mobile, text-4xl on desktop */}
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">FollowPack Pro</h1>
      </div>

      {/* Responsive Price: text-5xl on mobile, text-6xl on desktop */}
      <div className="mb-8 flex items-baseline gap-2">
        <span className="text-5xl font-black md:text-6xl">$99</span>
        <span className="text-lg text-slate-400">/mo</span>
      </div>

      <ul className="mb-10 space-y-4">
        {["Unlimited growth tools", "Real-time analytics", "24/7 priority support"].map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {item}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-500 active:scale-95 disabled:opacity-50"
      >
        {loading ? "Connecting to Stripe..." : "Upgrade Now"}
      </button>
      
      <p className="mt-6 text-center text-[10px] uppercase tracking-widest text-slate-500">
        Secure Payment via Stripe
      </p>
    </div>
  </main>
);