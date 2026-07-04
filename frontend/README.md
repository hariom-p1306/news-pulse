# 📰 News Pulse

News Pulse is a full-stack news aggregation platform that collects articles from multiple RSS feeds, extracts complete news content, clusters similar articles into topics, and presents them on an interactive timeline.

---

## Features

- RSS Feed Aggregation
- Full Article Extraction
- Duplicate Detection
- Topic Clustering using TF-IDF + KMeans
- Timeline Visualization
- Cluster Detail View
- Source Filtering
- Refresh News
- MongoDB Storage
- REST APIs

---

## Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Python
- Feedparser
- Newspaper3k
- Scikit-learn
- BeautifulSoup

---

## Project Structure

news-pulse/

├── scraper/

├── backend/

├── frontend/

└── README.md

---

## API Endpoints

GET /clusters

GET /clusters/:id

GET /timeline

POST /ingest/trigger

GET /ingest/status/:jobId

---

## Screenshots

(Add screenshots here)

---

## Future Improvements

- AI-generated Topic Labels
- Real-time Background Ingestion
- User Authentication
- Search Functionality
- Sentiment Analysis

---

## Author

Hariom Patel