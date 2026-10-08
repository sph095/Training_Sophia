import os
from tavily import TavilyClient

tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
response = tavily.search(query="HDFC Bank news", max_results=5)
print("Number of results:", len(response["results"]))
for r in response["results"][:3]:
    print("-", r["title"], "|", r["url"])
