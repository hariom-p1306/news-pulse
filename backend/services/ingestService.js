import { spawn } from "child_process";
import path from "path";

const jobs = {};

export const triggerIngestion = (req, res) => {

    const jobId = Date.now().toString();

    jobs[jobId] = {
        status: "running"
    };

    // Python Virtual Environment
    const pythonPath = path.join(
        process.cwd(),
        "../scraper/venv/Scripts/python.exe"
    );

    // main.py
    const pythonFile = path.join(
        process.cwd(),
        "../scraper/main.py"
    );

    console.log("Python:", pythonPath);
    console.log("Script:", pythonFile);

    const processRunner = spawn(
        pythonPath,
        [pythonFile],
        {
            cwd: path.join(process.cwd(), "../scraper")
        }
    );

    processRunner.stdout.on("data", (data) => {
        console.log(data.toString());
    });

    processRunner.stderr.on("data", (data) => {
        console.error(data.toString());
        jobs[jobId].status = "failed";
    });

    processRunner.on("close", (code) => {

        console.log("Python exited:", code);

        if (jobs[jobId].status !== "failed") {
            jobs[jobId].status = "completed";
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
            message: "Job not found"
        });
    }

    res.json(job);

};