"use client";

import Link from "next/link";

export default function ClusterCard({ cluster }) {
  return (
    <Link href={`/cluster/${cluster.cluster_id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-2 p-6 border">

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-3xl font-bold text-gray-800">
            {cluster.label}
          </h2>

          <span className="bg-blue-600 text-white-700 px-3 py-1 rounded-full text-sm">
            {cluster.articles.length} Articles
          </span>
        </div>

        <div className="text-gray-600 text-sm space-y-2">

          <p>
            📅 <strong>Start:</strong> {cluster.start_time}
          </p>

          <p>
            ⏰ <strong>End:</strong> {cluster.end_time}
          </p>

        </div>

      </div>
    </Link>
  );
}