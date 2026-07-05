from flask import Flask, jsonify
import threading
import traceback

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

    # print("\n========== /run API HIT ==========")

    if running:
        print("Scraper is already running.")

        return jsonify({
            "success": False,
            "message": "Scraper already running"
        }), 409

    def worker():

        global running

        running = True

        print("Worker Started...")

        try:

            # run_ingestion()

            print("Worker Finished Successfully.")

        except Exception:

            print("\n========== ERROR IN WORKER ==========")
            traceback.print_exc()
            print("=====================================\n")

        finally:

            running = False
            print("Worker Stopped.")

    threading.Thread(
        target=worker,
        daemon=True
    ).start()

    print("Returning Response Immediately...\n")

    return jsonify({
        "success": True,
        "message": "Scraper started successfully"
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=10000,
        debug=True
    )