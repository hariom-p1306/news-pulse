"use client";

import { useState } from "react";
import api from "../services/api";

export default function RefreshButton({ onRefresh }) {
  const [loading, setLoading] = useState(false);

  async function handleRefresh() {
    try {
      setLoading(true);

      // Start ingestion job
      const { data } = await api.post("/ingest/trigger");

      const jobId = data.jobId;

      // Poll every 2 seconds
      const interval = setInterval(async () => {
        try {
          const response = await api.get(`/ingest/status/${jobId}`);

          if (response.data.status === "completed") {
            clearInterval(interval);

            if (onRefresh) {
              await onRefresh();
            }

            setLoading(false);

            alert("✅ News updated successfully!");
          }

          if (response.data.status === "failed") {
            clearInterval(interval);

            setLoading(false);

            alert("❌ News refresh failed!");
          }
        } catch (error) {
          clearInterval(interval);

          setLoading(false);

          console.log(error);

          alert("Error checking job status.");
        }
      }, 2000);

    } catch (error) {
      console.log(error);

      setLoading(false);

      alert("Failed to start ingestion.");
    }
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 text-white px-5 py-2 rounded-lg font-semibold transition disabled:opacity-60"
    >
      {loading ? "⏳ Refreshing..." : "🔄 Refresh News"}
    </button>
  );
}