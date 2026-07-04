import axios from "axios";

const jobs = {};

export const triggerIngestion = async (req, res) => {

    const jobId = Date.now().toString();

    jobs[jobId] = {
        status: "running",
        startedAt: new Date()
    };

    try {

        const response = await axios.post(
            "https://news-pulse-1-hcic.onrender.com/run"
        );

        jobs[jobId].status = "completed";
        jobs[jobId].completedAt = new Date();

        res.status(200).json({
            success: true,
            jobId,
            status: jobs[jobId].status,
            scraperResponse: response.data
        });

    } catch (error) {

        console.error(error.message);

        jobs[jobId].status = "failed";

        res.status(500).json({
            success: false,
            jobId,
            status: jobs[jobId].status,
            message: error.message
        });

    }

};

export const getJobStatus = (req, res) => {

    const job = jobs[req.params.jobId];

    if (!job) {

        return res.status(404).json({
            success: false,
            message: "Job not found"
        });

    }

    res.status(200).json(job);

};