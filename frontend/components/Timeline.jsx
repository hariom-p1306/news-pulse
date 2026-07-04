"use client";

export default function Timeline({ clusters }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        📅 News Timeline
      </h2>

      <div className="flex items-center overflow-x-auto pb-5">
        {clusters.map((cluster, index) => (
          <div
            key={cluster.cluster_id}
            className="flex items-center"
          >
            {/* Timeline Node */}
            <div className="flex flex-col items-center min-w-[220px]">
              <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg"></div>

              <p className="mt-3 font-semibold text-center text-gray-800">
                {cluster.label}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {cluster.start_time?.split(" ")[0]}
              </p>
            </div>

            {/* Line (don't show after last node) */}
            {index !== clusters.length - 1 && (
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}