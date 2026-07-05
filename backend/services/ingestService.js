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
            "https://news-pulse-1-hcic.onrender.com/run",
            {},
            {
                timeout: 60000
            }
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

        // console.error("========== AXIOS ERROR ==========");
        // console.error("Message :", error.message);
        // console.error("Code :", error.code);
        // console.error("Status :", error.response?.status);
        // console.error("Data :", error.response?.data);
        // console.error("===============================");
        console.error(error);

        jobs[jobId].status = "failed";

        res.status(500).json({
            success: false,
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
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