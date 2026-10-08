from dotenv import load_dotenv
import os
from tavily import TavilyClient

load_dotenv()
tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

response = tavily.search(query="RBI news", max_results=5)
print("Full response keys:", list(response.keys()))
print("Number of results:", len(response.get("results", [])))
