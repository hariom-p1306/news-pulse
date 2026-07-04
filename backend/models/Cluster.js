import mongoose from "mongoose";

const ClusterSchema = new mongoose.Schema(
  {
    cluster_id: Number,
    label: String,
    article_count: Number,
    start_time: String,
    end_time: String,
    articles: [
      {
        source: String,
        title: String,
        link: String,
        published: String,
        summary: String,
        content: String,
      },
    ],
  },
  {
    collection: "clusters",
  }
);

export default mongoose.model("Cluster", ClusterSchema);