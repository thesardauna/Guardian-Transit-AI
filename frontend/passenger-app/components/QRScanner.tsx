"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { ShieldCheck, TriangleAlert } from "lucide-react";

interface VehicleData {
  vehicleId: string;
  driverName: string;
  plateNumber: string;
  safetyScore: number;
}

export default function QRScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [vehicle, setVehicle] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: {
          width: 250,
          height: 250,
        },
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        setScanResult(decodedText);
        setLoading(true);

        // Simulated API Response
        setTimeout(() => {
          setVehicle({
            vehicleId: "GT-2045",
            driverName: "Abdul Kareem Musa",
            plateNumber: "ABC-234-KD",
            safetyScore: 92,
          });

          setLoading(false);
        }, 1500);

        scanner.clear();
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Scanner */}
      {!scanResult && (
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-200">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Scan Vehicle QR Code
          </h2>

          <p className="text-slate-600 mb-6">
            Verify the vehicle and activate secure trip monitoring.
          </p>

          <div id="qr-reader" className="rounded-xl overflow-hidden" />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-soft p-10 mt-6 text-center">
          <div className="animate-pulse">
            <p className="text-lg font-semibold text-primary">
              Verifying vehicle identity...
            </p>

            <p className="text-slate-500 mt-2">
              Connecting to Guardian Transit AI
            </p>
          </div>
        </div>
      )}

      {/* Vehicle Result */}
      {vehicle && (
        <div className="bg-white rounded-2xl shadow-soft p-6 mt-6 border border-slate-200">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-accent" size={32} />

            <div>
              <h3 className="text-2xl font-bold text-primary">
                Vehicle Verified
              </h3>

              <p className="text-slate-500">
                Government-approved transport identity confirmed
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <InfoCard
              label="Vehicle ID"
              value={vehicle.vehicleId}
            />

            <InfoCard
              label="Driver"
              value={vehicle.driverName}
            />

            <InfoCard
              label="Plate Number"
              value={vehicle.plateNumber}
            />

            <InfoCard
              label="Safety Score"
              value={`${vehicle.safetyScore}%`}
            />
          </div>

          {/* AI Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 mt-8">
            <div className="flex gap-3">
              <TriangleAlert className="text-warning mt-1" />

              <div>
                <h4 className="font-semibold text-yellow-800">
                  AI Safety Recommendation
                </h4>

                <p className="text-yellow-700 mt-2 text-sm leading-relaxed">
                  This vehicle has a high trust rating and no
                  suspicious activity detected within the last
                  30 days.
                </p>
              </div>
            </div>
          </div>

          {/* Start Trip */}
          <button className="w-full mt-8 bg-accent text-black font-semibold py-4 rounded-2xl hover:scale-[1.01] transition">
            Start Secure Trip
          </button>
        </div>
      )}
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
