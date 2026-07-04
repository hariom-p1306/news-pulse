from flask import Flask, jsonify
import threading

from main import run_ingestion

app = Flask(__name__)

running = False


@app.route("/")
def home():

    return jsonify({
        "message": "News Pulse Scraper API Running"
    })


@app.route("/run", methods=["POST"])
def run():

    global running

    if running:

        return jsonify({
            "success": False,
            "message": "Scraper already running"
        }), 409

    def worker():

        global running

        running = True

        try:
            run_ingestion()
        except Exception as e:
            print(e)

        running = False

    threading.Thread(target=worker).start()

    return jsonify({
        "success": True,
        "message": "Scraper started successfully"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)