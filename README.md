# 📰 News Pulse – Topic Clustered News Timeline

News Pulse is a full-stack news aggregation platform that fetches the latest news from multiple RSS feeds, extracts complete article content, groups related articles into topic clusters using Machine Learning, and visualizes them on an interactive timeline.

This project was developed as part of the **Xponentium Full Stack Developer Internship Assessment**.

---

# 🚀 Live Demo

## Frontend

https://news-pulse-zeta-azure.vercel.app/

## Backend API

https://news-pulse-sie3.onrender.com

## Python Scraper API

https://news-pulse-1-hcic.onrender.com

---

# 📹 Video Walkthrough

Add your Loom or YouTube walkthrough link here.

---

# 🏗️ Project Architecture

```
                    RSS Feeds
          (BBC, NPR, Guardian)

                    │
                    ▼

        Python Scraper (Flask API)
        ─────────────────────────
        • RSS Parsing
        • Article Extraction
        • Duplicate Detection
        • TF-IDF Vectorization
        • KMeans Clustering

                    │
                    ▼

             MongoDB Atlas

                    ▲
                    │

         Node.js + Express API

                    ▲
                    │

      Next.js + React Frontend
```

---

# 🛠 Tech Stack

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

- Flask
- feedparser
- newspaper3k
- BeautifulSoup4
- scikit-learn
- pymongo

## Database

- MongoDB Atlas

---

# ✨ Features

- Fetches live news from multiple RSS feeds
- Extracts complete article content
- Prevents duplicate articles
- Automatically groups related news into topic clusters
- Interactive timeline visualization
- View all articles inside a cluster
- Filter news by source
- Refresh news with one click
- REST API
- MongoDB persistence

---

# 📰 News Sources

Currently supported RSS feeds:

- BBC News
- NPR News
- The Guardian

Additional RSS feeds can easily be added.

---

# 🧠 Topic Clustering Approach

The project groups similar news articles using **TF-IDF Vectorization** and **KMeans Clustering**.

### Workflow

1. Fetch news articles from RSS feeds.
2. Extract full article content.
3. Combine article title and content.
4. Generate TF-IDF vectors.
5. Cluster similar articles using KMeans.
6. Generate cluster labels using the highest TF-IDF keywords.
7. Store clustered data in MongoDB.

### Why TF-IDF + KMeans?

- Fast and lightweight
- No external AI model required
- Produces meaningful topic groups
- Suitable for news clustering
- Recommended approach for the assignment

---

# 🚫 Duplicate Handling

Before storing a news article, the scraper checks whether another article with the same URL already exists.

If found, the article is skipped.

This allows the scraper to run multiple times without inserting duplicate news.

---

# 📁 Project Structure

```
news-pulse/

├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── styles/
│
├── scraper/
│   ├── app.py
│   ├── main.py
│   ├── cluster.py
│   ├── database.py
│   ├── extractor.py
│   ├── rss.py
│   ├── config.py
│   └── requirements.txt
│
└── README.md
```

---

# 🔗 API Endpoints

## Get All Clusters

```
GET /clusters
```

Returns all news clusters.

---

## Get Cluster Details

```
GET /clusters/:id
```

Returns all articles belonging to a cluster.

---

## Trigger News Refresh

```
POST /ingest/trigger
```

Starts the Python scraping and clustering pipeline.

---

## Check Refresh Status

```
GET /ingest/status/:jobId
```

Returns the ingestion job status.

---

# ⚙️ Environment Variables

## Backend

```
PORT=5000

MONGO_URI=your_mongodb_connection_string
```

---

## Frontend

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

For production:

```
NEXT_PUBLIC_API_URL=https://news-pulse-sie3.onrender.com
```

---

## Scraper

```
MONGO_URI=your_mongodb_connection_string
```

---

# 💻 Local Installation

## Clone Repository

```bash
git clone https://github.com/hariom-p1306/news-pulse.git

cd news-pulse
```

---

## Backend

```bash
cd backend

npm install

npm run dev
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## Python Scraper

```bash
cd scraper

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

---

# ☁️ Deployment

| Component | Platform |
|------------|----------|
| Frontend | Vercel |
| Backend API | Render |
| Python Scraper API | Render |
| Database | MongoDB Atlas |

The backend triggers the Python scraper through the `/ingest/trigger` endpoint. The scraper runs asynchronously, updates MongoDB, and the frontend polls the backend until the ingestion job is completed.

---

# 🚧 Challenges Faced

## 1. Duplicate News Articles

### Problem

Running the scraper multiple times inserted duplicate articles.

### Solution

Created a unique index on article URLs and skipped existing articles before insertion.

---

## 2. News Refresh Synchronization

### Problem

The frontend refreshed before scraping and clustering finished.

### Solution

Implemented job status polling using `/ingest/status/:jobId` to wait until ingestion completed.

---

## 3. Deployment Issues

### Problem

Deploying the Python scraper on Render caused timeout and long-running request issues.

### Solution

Converted the scraper into a Flask API and executed the ingestion process in a background thread to avoid blocking HTTP requests.

---

# ⚠️ Limitations

- KMeans requires the number of clusters to be predefined.
- Articles using very different wording may end up in different clusters.
- Source filtering is manual.
- Timeline uses a custom UI instead of a dedicated visualization library.

---

# 🚀 Future Improvements

- Automatic scheduled news refresh
- Better timeline visualization
- Semantic clustering using embeddings
- Search functionality
- Authentication
- Bookmark favorite news
- Category-wise filtering

---

# 👨‍💻 Author

**Hariom Patel**

Backend-Focused Full Stack Developer

### GitHub

https://github.com/hariom-p1306

### LinkedIn

https://www.linkedin.com/in/hariom-patel-dev

### Email

hp3432884@gmail.com

---

# 🙏 Acknowledgements

This project was developed for the **Xponentium Full Stack Developer Internship Assessment**.

Thank you for reviewing the project.