from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans


def cluster_articles(articles, num_clusters=5):
    """
    Groups similar news articles together.

    Args:
        articles (list): List of article dictionaries.
        num_clusters (int): Desired number of clusters.

    Returns:
        list
    """

    if len(articles) == 0:
        return []

    if len(articles) <= num_clusters:
        num_clusters = len(articles)

    corpus = []

    for article in articles:
        title = article.get("title", "")
        content = article.get("content", "")

        corpus.append(
            title + " " + content
        )

    vectorizer = TfidfVectorizer(
        stop_words="english",
        max_features=3000
    )

    X = vectorizer.fit_transform(corpus)

    model = KMeans(
        n_clusters=num_clusters,
        random_state=42,
        n_init=10
    )

    labels = model.fit_predict(X)

    clusters = {}

    for label, article in zip(labels, articles):

        if label not in clusters:
            clusters[label] = []

        clusters[label].append(article)

    result = []

    feature_names = vectorizer.get_feature_names_out()

    centers = model.cluster_centers_

    for label, docs in clusters.items():

        center = centers[label]

        top_indices = center.argsort()[-3:][::-1]

        keywords = [
            feature_names[i]
            for i in top_indices
        ]

        published_dates = [
            article.get("published", "")
            for article in docs
            if article.get("published")
        ]

        result.append(
            {
                "cluster_id": int(label),
                "label": ", ".join(keywords),
                "article_count": len(docs),
                "start_time": min(published_dates) if published_dates else None,
                "end_time": max(published_dates) if published_dates else None,
                "articles": docs,
            }
        )

    result.sort(
        key=lambda x: x["article_count"],
        reverse=True,
    )

    return result