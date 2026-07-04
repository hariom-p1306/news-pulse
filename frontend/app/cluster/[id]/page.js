"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import api from "../../../services/api";

export default function ClusterDetailPage() {
  const { id } = useParams();

  const [cluster, setCluster] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCluster();
    }
  }, [id]);

  async function fetchCluster() {
    try {
      const { data } = await api.get(`/clusters/${id}`);
      setCluster(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!cluster) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Cluster Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-block mb-4 text-blue-100 hover:text-white transition"
          >
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-extrabold">
            {cluster.label}
          </h1>

          <p className="mt-3 text-lg text-blue-100">
            📰 Total Articles:{" "}
            <span className="font-bold">
              {cluster.article_count}
            </span>
          </p>
        </div>
      </div>

      {/* Articles */}
      <div className="max-w-6xl mx-auto p-8 space-y-6">
        {cluster.articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-bold text-gray-900">
              {article.title}
            </h2>

            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Source:</span>{" "}
                {article.source}
              </p>

              <p className="text-gray-600">
                <span className="font-semibold">Published:</span>{" "}
                {article.published}
              </p>
            </div>

            <p className="mt-5 text-gray-700 leading-7">
              {article.summary}
            </p>

            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              🔗 Read Full Article
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}