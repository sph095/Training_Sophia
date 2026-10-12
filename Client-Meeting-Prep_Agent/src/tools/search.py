from ddgs import DDGS
from langchain_core.tools import tool

from ..config import SEARCH_MAX_RESULTS


@tool
def search_web(query: str) -> str:
    """Searches DuckDuckGo for the query and returns top organic results with URLs and snippets."""
    try:
        with DDGS(timeout=10) as ddgs:
            raw_results = list(ddgs.text(query, max_results=SEARCH_MAX_RESULTS))

        if not raw_results:
            return "No search results found. Proceed with institutional context."

        formatted = []
        for r in raw_results:
            formatted.append(
                f"Title: {r.get('title')}\nURL: {r.get('href')}\nSnippet: {r.get('body')}\n---"
            )
        return "\n".join(formatted)
    except Exception as e:
        return f"Search engine note: {str(e)}. Proceed using institutional tech context."
