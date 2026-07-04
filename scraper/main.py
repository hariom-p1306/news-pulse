import sys
import feedparser

# Fix Windows UTF-8 Encoding
sys.stdout.reconfigure(encoding="utf-8")

from rss import rss_feeds
from extractor import extract_article
from database import (
    articles_collection,
    clusters_collection
)
from cluster import cluster_articles

articles = []

# ----------------------------------------------------
# Fetch Latest Articles
# ----------------------------------------------------
for feed_info in rss_feeds:

    print(f"\nFetching {feed_info['name']}...")

    feed = feedparser.parse(feed_info["url"])

    for article in feed.entries:

        link = article.get("link", "")

        if not link:
            continue

        # Skip duplicate articles
        existing_article = articles_collection.find_one({
            "link": link
        })

        if existing_article:
            print("Duplicate Skipped")
            continue

        # Extract Full Content
        content = extract_article(link)

        article_data = {
            "source": feed_info["name"],
            "title": article.get("title", "No Title"),
            "link": link,
            "published": article.get("published", "No Date"),
            "summary": article.get("summary", "No Summary"),
            "content": content
        }

        # Save into MongoDB
        articles_collection.insert_one(article_data)

        articles.append(article_data)

        print(f"Saved : {article_data['title']}")

print("\n" + "=" * 80)
print(f"Total New Articles Saved : {len(articles)}")
print("=" * 80)

# ----------------------------------------------------
# Create Topic Clusters
# ----------------------------------------------------

print("\nCreating Topic Clusters...\n")

# Fetch ALL articles from MongoDB
all_articles = list(
    articles_collection.find(
        {},
        {"_id": 0}
    )
)

print(f"Total Articles in Database : {len(all_articles)}")

if len(all_articles) == 0:

    print("No articles found.")

else:

    clusters = cluster_articles(all_articles)

    # Remove previous clusters
    clusters_collection.delete_many({})

    # Save new clusters
    for cluster in clusters:

        clusters_collection.insert_one(cluster)

        print("=" * 80)
        print(f"Cluster ID   : {cluster['cluster_id']}")
        print(f"Label        : {cluster['label']}")
        print(f"Articles     : {cluster['article_count']}")
        print(f"Start Time   : {cluster['start_time']}")
        print(f"End Time     : {cluster['end_time']}")
        print("-" * 80)

        for article in cluster["articles"]:
            print(f"- {article['title']}")

        print("=" * 80)

print("\nTopic Clusters Saved Successfully!")