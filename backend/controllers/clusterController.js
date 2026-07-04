import Cluster from "../models/Cluster.js";

// GET /clusters
export const getClusters = async (req, res) => {
  try {

    const clusters = await Cluster.find().sort({
      start_time: -1,
    });

    res.status(200).json(clusters);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// GET /clusters/:id
export const getClusterById = async (req, res) => {

  try {

    const clusterId = Number(req.params.id);

    const cluster = await Cluster.findOne({
      cluster_id: clusterId
    });

    if (!cluster) {
      return res.status(404).json({
        success: false,
        message: "Cluster not found"
      });
    }

    res.status(200).json(cluster);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

// GET /timeline
export const getTimeline = async (req, res) => {
  try {

    const clusters = await Cluster.find(
      {},
      {
        cluster_id: 1,
        label: 1,
        start_time: 1,
        end_time: 1,
        article_count: 1,
      }
    );

    const timeline = clusters.map((cluster) => ({
      cluster_id: cluster.cluster_id,
      label: cluster.label,
      start: cluster.start_time,
      end: cluster.end_time,
      articleCount: cluster.article_count,
      intensity: cluster.article_count,
    }));

    res.status(200).json(timeline);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};