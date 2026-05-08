"use client";

import { useState } from "react";
import { Siren, ShieldAlert } from "lucide-react";

export default function EmergencyButton() {
  const [sending, setSending] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleEmergency = async () => {
    setSending(true);

    // Simulate emergency API request
    setTimeout(() => {
      setSending(false);
      setAlertSent(true);
    }, 2000);
  };

  return (
    <div className="w-full">
      {!alertSent ? (
        <button
          onClick={handleEmergency}
          disabled={sending}
          className="w-full bg-danger hover:opacity-90 transition rounded-2xl py-5 text-white font-bold text-lg shadow-soft"
        >
          <div className="flex items-center justify-center gap-3">
            <Siren size={26} />

            {sending ? "Sending Emergency Alert..." : "Emergency SOS"}
          </div>
        </button>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 shadow-soft">
          <div className="flex items-start gap-4">
            <ShieldAlert className="text-green-600 mt-1" size={30} />

            <div>
              <h3 className="text-xl font-bold text-green-700">
                Emergency Alert Sent
              </h3>

              <p className="text-green-700 mt-2 leading-relaxed">
                Guardian Transit AI has notified nearby authorities,
                emergency contacts, and the transport monitoring center.
              </p>

              <div className="mt-4 bg-white rounded-xl p-4 border border-green-100">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">
                    AI Incident Summary:
                  </span>{" "}
                  Unusual trip activity detected. Passenger emergency
                  signal triggered during active trip monitoring.
                  Authorities have been alerted for rapid response.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
