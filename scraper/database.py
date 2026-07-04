from pymongo import MongoClient
from config import MONGO_URI

# Create MongoDB client
client = MongoClient(MONGO_URI)

# Database
db = client["news_pulse"]

# Collections
articles_collection = db["articles"]
clusters_collection = db["clusters"]

# -----------------------------
# Indexes
# -----------------------------

# Prevent duplicate articles
articles_collection.create_index(
    "link",
    unique=True
)

# Cluster ID index
clusters_collection.create_index(
    "cluster_id"
)