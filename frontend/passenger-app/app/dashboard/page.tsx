import {
  ShieldCheck,
  TriangleAlert,
  Car,
  MapPinned,
} from "lucide-react";

import EmergencyButton from "@/components/EmergencyButton";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Passenger Dashboard
            </h1>

            <p className="text-slate-600 mt-2">
              Live AI-powered transport safety monitoring
            </p>
          </div>

          <div className="bg-accent/10 text-accent px-5 py-3 rounded-2xl font-semibold">
            AI Protection Active
          </div>
        </div>

        {/* Stats */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <StatCard
            title="Trip Status"
            value="Active"
            icon={<Car size={26} />}
          />

          <StatCard
            title="Safety Score"
            value="92%"
            icon={<ShieldCheck size={26} />}
          />

          <StatCard
            title="Risk Level"
            value="Low"
            icon={<TriangleAlert size={26} />}
          />

          <StatCard
            title="Route Status"
            value="Verified"
            icon={<MapPinned size={26} />}
          />
        </section>

        {/* Active Trip */}
        <section className="grid lg:grid-cols-3 gap-6 mt-10">
          {/* Trip Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-soft p-6 border border-slate-200">
            <h2 className="text-2xl font-bold text-primary">
              Active Trip Monitoring
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">
              <InfoCard
                label="Driver"
                value="Abdul Kareem Musa"
              />

              <InfoCard
                label="Vehicle ID"
                value="GT-2045"
              />

              <InfoCard
                label="Plate Number"
                value="ABC-234-KD"
              />

              <InfoCard
                label="Estimated Arrival"
                value="18 mins"
              />
            </div>

            {/* AI Alert */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-8">
              <h3 className="font-bold text-blue-800">
                AI Safety Analysis
              </h3>

              <p className="text-blue-700 mt-2 leading-relaxed">
                Current trip activity appears normal. No suspicious
                route deviation, prolonged stop duration, or unsafe
                driving behavior detected.
              </p>
            </div>
          </div>

          {/* Emergency */}
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-200">
            <h2 className="text-2xl font-bold text-primary">
              Emergency Center
            </h2>

            <p className="text-slate-600 mt-3 mb-6">
              Trigger immediate AI-assisted emergency response.
            </p>

            <EmergencyButton />
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-primary mt-2">
            {value}
          </h3>
        </div>

        <div className="text-accent">
          {icon}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h4 className="text-lg font-semibold text-primary mt-1">
        {value}
      </h4>
    </div>
  );
}
