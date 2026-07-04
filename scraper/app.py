from flask import Flask, jsonify
import subprocess
import sys

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "message": "News Pulse Scraper API Running"
    })

@app.route("/run", methods=["POST"])
def run_scraper():
    try:
        result = subprocess.run(
            [sys.executable, "main.py"],
            capture_output=True,
            text=True
        )

        return jsonify({
            "success": True,
            "output": result.stdout,
            "error": result.stderr
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)