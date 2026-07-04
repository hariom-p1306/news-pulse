"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import ClusterCard from "../components/ClusterCard";
import RefreshButton from "../components/RefreshButton";
import Timeline from "../components/Timeline";
import SourceFilter from "../components/SourceFilter";
import Loading from "../components/Loading";

export default function Home() {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSource, setSelectedSource] = useState("All");

 const sources = [
  ...new Set(
    clusters.flatMap(cluster =>
      (cluster.articles || []).map(article => article.source)
    )
  )
];

 const filteredClusters = clusters
  .map(cluster => ({

    ...cluster,

    articles:

      selectedSource === "All"

        ? (cluster.articles || [])

        : (cluster.articles || []).filter(

            article => article.source === selectedSource

          )

  }))
  .filter(cluster => cluster.articles.length > 0);

  useEffect(() => {
    fetchClusters();
  }, []);

  async function fetchClusters() {
    try {
      const { data } = await api.get("/clusters");
      setClusters(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

if (loading) {

    return (

        <main className="min-h-screen bg-gray-100 p-8">

            <Loading />

        </main>

    );

}
  return (
    <main className="min-h-screen bg-gray-100">

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">

        <h1 className="text-5xl font-extrabold tracking-tight">
          📰 News Pulse
        </h1>
        <div className="mt-5">

          <RefreshButton

            onRefresh={fetchClusters}

          />

        </div>

        <p className="mt-3 text-blue-100 text-lg">
          Topic Clustered News Timeline
        </p>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        <Timeline clusters={clusters} />

        <SourceFilter
          sources={sources}
          selectedSource={selectedSource}
          onChange={setSelectedSource}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredClusters.map((cluster) => (

            <ClusterCard
              key={cluster.cluster_id}
              cluster={cluster}
            />

          ))}

        </div>

      </div>


    </main>
  );
}