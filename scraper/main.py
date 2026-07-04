import sys
import feedparser

from rss import rss_feeds
from extractor import extract_article
from database import (
    articles_collection,
    clusters_collection
)
from cluster import cluster_articles


def run_ingestion():

    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except:
        pass

    articles = []

    print("Starting ingestion...")

    # ----------------------------
    # Fetch Articles
    # ----------------------------
    for feed_info in rss_feeds:

        print(f"Fetching {feed_info['name']}")

        feed = feedparser.parse(feed_info["url"])

        for article in feed.entries:

            link = article.get("link", "")

            if not link:
                continue

            if articles_collection.find_one({"link": link}):
                continue

            content = extract_article(link)

            article_data = {
                "source": feed_info["name"],
                "title": article.get("title", "No Title"),
                "link": link,
                "published": article.get("published", "No Date"),
                "summary": article.get("summary", ""),
                "content": content
            }

            articles_collection.insert_one(article_data)

            articles.append(article_data)

    print(f"New Articles : {len(articles)}")

    # ----------------------------
    # Clustering
    # ----------------------------

    all_articles = list(
        articles_collection.find({}, {"_id": 0})
    )

    if len(all_articles) == 0:
        print("No articles found.")
        return

    clusters = cluster_articles(all_articles)

    clusters_collection.delete_many({})

    for cluster in clusters:
        clusters_collection.insert_one(cluster)

    print("Clustering Completed")


if __name__ == "__main__":
    run_ingestion()