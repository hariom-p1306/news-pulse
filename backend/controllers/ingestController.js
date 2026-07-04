import { spawn } from "child_process";
import path from "path";

const jobs = {};

export const triggerIngestion = (req, res) => {

    const jobId = Date.now().toString();

    jobs[jobId] = {
        status: "running",
        startedAt: new Date()
    };

    

    const scraperPath = path.join(
        process.cwd(),
        "../scraper/main.py"
    );

    // Virtual Environment Python
    const pythonPath = path.join(
        process.cwd(),
        "../scraper/venv/Scripts/python.exe"
    );

   console.log("Python Path:", pythonPath);
console.log("Scraper Path:", scraperPath);
console.log("Working Directory:", path.join(process.cwd(), "../scraper"));

    // const python = spawn(pythonPath, [scraperPath]);

    const python = spawn(pythonPath, [scraperPath], {
    cwd: path.join(process.cwd(), "../scraper")
});
    python.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    python.stderr.on("data", (data) => {
        console.error(data.toString());

        jobs[jobId].status = "failed";
    });

    python.on("close", () => {

        if (jobs[jobId].status !== "failed") {

            jobs[jobId].status = "completed";
            jobs[jobId].completedAt = new Date();

        }

    });

    res.status(200).json({
        success: true,
        jobId,
        status: jobs[jobId].status
    });

};

export const getJobStatus = (req, res) => {

    const job = jobs[req.params.jobId];

    if (!job) {

        return res.status(404).json({
            success: false,
            message: "Job not found"
        });

    }

    res.json(job);

};