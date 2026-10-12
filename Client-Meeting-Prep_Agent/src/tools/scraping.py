import requests
from bs4 import BeautifulSoup
from langchain_core.tools import tool

from ..config import FETCH_CHAR_LIMIT, FETCH_TIMEOUT

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    )
}


@tool
def fetch_page_content(url: str) -> str:
    """Fetches a specific webpage URL, strips scripts/styles, and extracts readable text."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=FETCH_TIMEOUT)
        if resp.status_code != 200:
            return f"Failed to fetch {url} (HTTP {resp.status_code})"

        soup = BeautifulSoup(resp.content, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "noscript"]):
            tag.decompose()

        text = " ".join(soup.stripped_strings)
        if len(text) > FETCH_CHAR_LIMIT:
            return text[:FETCH_CHAR_LIMIT] + "\n[...truncated]"
        return text
    except Exception as e:
        return f"Error extracting page {url}: {str(e)}"
