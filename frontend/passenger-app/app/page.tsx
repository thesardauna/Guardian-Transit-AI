"use client";

import Link from "next/link";
import { ShieldCheck, MapPinned, Siren, ScanLine } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white rounded-[2rem] p-10 shadow-soft"
        >
          <div className="flex flex-col lg:flex-row justify-between gap-10 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-bold leading-tight">
                Guardian Transit AI
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                AI-powered transport safety, smart recommendations,
                emergency monitoring, and trusted mobility verification
                for passengers and transport authorities.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/scan"
                  className="bg-accent text-black font-semibold px-6 py-3 rounded-xl hover:scale-105 transition"
                >
                  Scan Vehicle QR
                </Link>

                <Link
                  href="/dashboard"
                  className="border border-slate-500 px-6 py-3 rounded-xl hover:bg-secondary transition"
                >
                  Open Dashboard
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <FeatureCard
                icon={<ScanLine size={28} />}
                title="QR Verification"
                description="Instantly verify registered vehicles and drivers."
              />

              <FeatureCard
                icon={<ShieldCheck size={28} />}
                title="AI Safety Agent"
                description="Real-time threat detection and risk analysis."
              />

              <FeatureCard
                icon={<MapPinned size={28} />}
                title="Live Tracking"
                description="Monitor routes and detect unusual movement."
              />

              <FeatureCard
                icon={<Siren size={28} />}
                title="Emergency SOS"
                description="Send emergency alerts to authorities instantly."
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Safety Section */}
      <section className="max-w-7xl mx-auto mt-16">
        <div className="grid md:grid-cols-3 gap-6">
          <SafetyStat
            value="98%"
            label="Verified Driver Accuracy"
          />

          <SafetyStat
            value="24/7"
            label="AI Risk Monitoring"
          />

          <SafetyStat
            value="Real-Time"
            label="Emergency Response Alerts"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-slate-500 mt-20">
        <p>
          Guardian Transit AI © 2026 — Secure Mobility Intelligence
        </p>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-secondary rounded-2xl p-5 border border-slate-700">
      <div className="text-accent">{icon}</div>

      <h3 className="mt-4 text-lg font-semibold">
        {title}
      </h3>

      <p className="text-sm text-slate-300 mt-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function SafetyStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-8 text-center border border-slate-200">
      <h2 className="text-4xl font-bold text-primary">
        {value}
      </h2>

      <p className="mt-3 text-slate-600">
        {label}
      </p>
    </div>
  );
}
