# 📰 News Pulse – Topic Clustered News Timeline

A full-stack news aggregation system that fetches live news from multiple RSS feeds, extracts complete articles, groups related articles into topic clusters, and visualizes them on an interactive timeline.

This project was built as part of the **Xponentium Full Stack Developer Internship Assessment**.

---

# Live Demo

Frontend:
> Add after deployment

Backend API:
> Add after deployment

Video Walkthrough:
> Add Loom/YouTube link after recording

---

# Project Architecture

```
                RSS Feeds
      (BBC, NPR, Reuters)

               │
               ▼

      Python Scraper Pipeline
    - RSS Parsing
    - Full Article Extraction
    - Duplicate Detection
    - Topic Clustering

               │
               ▼

          MongoDB Atlas

               ▲
               │

        Node.js + Express API

               ▲
               │

       Next.js Frontend
```

---

# Tech Stack

## Frontend

- Next.js
- React
- Tailwind CSS
- Axios

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Python Pipeline

- feedparser
- newspaper3k
- scikit-learn
- BeautifulSoup
- pymongo

## Database

- MongoDB Atlas

---

# Features

- Fetches live news from multiple RSS feeds
- Extracts complete article content
- Prevents duplicate articles
- Automatically groups related news into topic clusters
- Interactive timeline visualization
- Cluster detail page
- Source filtering
- Manual Refresh button
- REST API
- MongoDB persistence

---

# News Sources

The scraper currently uses public RSS feeds from:

- BBC News
- NPR News
- Reuters

(Additional RSS feeds can be added easily.)

---

# Topic Grouping Approach

This project uses **TF-IDF + KMeans Clustering**.

### Process

1. Fetch all articles.
2. Combine title and summary.
3. Generate TF-IDF vectors.
4. Cluster similar articles using KMeans.
5. Generate labels using the top TF-IDF keywords.
6. Store clustered data in MongoDB.

### Why TF-IDF?

TF-IDF is simple, fast, and works well for grouping articles discussing similar topics without requiring deep NLP models. It also matches one of the recommended approaches in the assessment. :contentReference[oaicite:2]{index=2}

---

# Duplicate Handling

Before inserting an article into MongoDB, the scraper checks whether another article with the same URL already exists.

This allows the scraper to be executed repeatedly without storing duplicate articles.

---

# Project Structure

```
news-pulse/

│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   └── styles/
│
├── scraper/
│   ├── main.py
│   ├── extractor.py
│   ├── cluster.py
│   ├── database.py
│   ├── rss.py
│   └── requirements.txt
│
└── README.md
```

---

# API Endpoints

## Clusters

```
GET /clusters
```

Returns all topic clusters.

---

## Cluster Details

```
GET /clusters/:id
```

Returns all articles inside a cluster.

---

## Timeline

```
GET /timeline
```

Returns formatted timeline data.

---

## Trigger Ingestion

```
POST /ingest/trigger
```

Starts the Python scraping and clustering pipeline.

---

## Job Status

```
GET /ingest/status/:jobId
```

Returns the current ingestion job status.

---

# Environment Variables

## Backend

```
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

## Frontend

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# Installation

## Clone Repository

```
git clone <repository-url>
```

---

## Backend

```
cd backend

npm install

npm run dev
```

---

## Frontend

```
cd frontend

npm install

npm run dev
```

---

## Scraper

```
cd scraper

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python main.py
```

---

# Deployment

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Python Scraper | Triggered via Backend API |

The scraper is executed on demand through the `POST /ingest/trigger` endpoint, which starts the Python pipeline as a subprocess. This matches the deployment approach suggested in the assessment. :contentReference[oaicite:3]{index=3}

---

# Challenges Faced

## 1. Duplicate Articles

Problem:

Running the scraper multiple times inserted duplicate news.

Solution:

Checked article URLs before insertion and skipped duplicates.

---

## 2. Refresh Pipeline

Problem:

The Refresh button completed before scraping finished.

Solution:

Implemented job status polling to wait for completion before refreshing the UI.

---

## 3. Python Environment

Problem:

The backend initially launched the system Python instead of the virtual environment.

Solution:

Configured the backend to execute the scraper using the project's virtual environment.

---

# Limitations

- Uses KMeans, so the number of clusters must be chosen.
- Articles discussing the same event using very different wording may end up in separate clusters.
- Source filtering is manual.
- Timeline currently uses a custom implementation instead of a dedicated chart library.

---

# Future Improvements

- Automatic background refresh
- Better timeline visualization using Recharts or Vis Timeline
- Semantic clustering using sentence embeddings
- Automatic cluster merging across different news sources
- User authentication
- Search functionality

---

# Author

**Hariom Patel**

Backend-Focused Full Stack Developer

GitHub:
https://github.com/hariom-p1306

LinkedIn:
(Add your LinkedIn URL)

Email:
(Add your email)

---

Thank you for reviewing this project.