import json
import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from tavily import TavilyClient

load_dotenv()

tavily = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))


def get_input():
    """Collect bank and CTO names from the user."""
    bank_name = input("Enter bank name: ").strip()
    cto_name = input("Enter CTO name: ").strip()
    if not bank_name or not cto_name:
        raise ValueError("Both bank and CTO names are required.")
    return {"bank_name": bank_name, "cto_name": cto_name}


def build_queries(bank_name, cto_name):
    """Generate 3 queries per entity."""
    return {
        "bank": [
            f"{bank_name} news",
            f"{bank_name} revenue funding",
            f"{bank_name} about company"
        ],
        "cto": [
            f"{cto_name} {bank_name} interview",
            f"{cto_name} {bank_name} keynote talk",
            f"{cto_name} {bank_name} bio background"
        ]
    }


def search(queries):
    """Run all queries, collect raw results per query."""
    results = {}  # { query: [ {title, url, content}, ... ] }
    for entity, query_list in queries.items():
        results[entity] = []
        for q in query_list:
            response = tavily.search(query=q, max_results=5)
            results[entity].append(response["results"])
    return results


def is_paywalled(url):
    paywall_domains = ["wsj.com", "ft.com", "bloomberg.com",
                       "economist.com", "nytimes.com"]
    return any(d in url for d in paywall_domains)


def is_duplicate(kept, result):
    for r in kept:
        if r["url"] == result["url"]:
            return True
        if r["title"].lower().strip() == result["title"].lower().strip():
            return True
    return False


def filter_results(raw_results, max_per_query=5, min_per_query=3):
    """raw_results: dict of { entity: [ [results per query], ... ] }"""
    filtered = []
    for entity, query_groups in raw_results.items():
        for group in query_groups:
            kept = []
            for result in group:
                if is_paywalled(result["url"]):
                    continue
                if is_duplicate(kept, result):
                    continue
                # FIX: Tavily returns 'content', not 'snippet'
                snippet = result.get("snippet") or result.get("content") or ""
                if len(snippet) < 20:
                    continue
                kept.append(result)
            kept = kept[:max_per_query]
            if len(kept) < min_per_query:
                print(f"WARNING: only {len(kept)} results for a {entity} query")
            filtered.extend(kept)
    return filtered


def fetch_and_clean(url):
    try:
        response = requests.get(
            url,
            headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"},
            timeout=10
        )
        response.raise_for_status()
    except Exception as e:
        print(f"  Skipping {url}: {e}")
        return None

    soup = BeautifulSoup(response.text, "html.parser")

    for tag in soup.find_all(["script", "style", "nav", "header",
                              "footer", "aside", "iframe", "form", "noscript"]):
        tag.decompose()

    text = soup.get_text(separator="\n")
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    clean = "\n".join(lines)

    return {"url": url, "text": clean[:8000]}


import google.generativeai as genai
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def build_prompt(articles, bank_name, cto_name):
    combined = ""
    for i, a in enumerate(articles, 1):
        combined += f"\n--- Article {i} ({a['url']}) ---\n{a['text']}\n"

    system = """You are a meeting prep assistant. Write a one-page brief for an account manager meeting a bank's CTO.
RULES:
- Every fact MUST include its source URL in brackets, e.g. [https://...]
- No source, no fact. If a fact isn't in the articles, don't include it.
- If LinkedIn is mentioned, treat it as low-confidence background only.
- Output ONLY valid JSON."""

    user = f"""Bank: {bank_name}
CTO: {cto_name}

Articles:
{combined}

Write a brief with EXACTLY these 4 sections:
1. Snapshot — what the company does, size, HQ, revenue, funding stage
2. What's happening — 3-5 recent developments
3. Talking points — 3-5 openers tailored to the CTO
4. Questions to ask — 3-5 sharp questions

Respond ONLY as JSON:
{{"snapshot": "...", "whats_happening": ["..."], "talking_points": ["..."], "questions_to_ask": ["..."]}}"""
    return system, user


def summarize(articles, bank_name, cto_name):
    system, user = build_prompt(articles, bank_name, cto_name)
    model = genai.GenerativeModel(
        "gemini-3.8-flash",
        system_instruction=system
    )

    response = model.generate_content(
        user,
        generation_config=genai.types.GenerationConfig(
            temperature=0.3,
            response_mime_type="application/json"
        )
    )
    return json.loads(response.text)


def format_markdown(brief, articles):
    md = ["# Meeting Prep Brief", ""]
    md += ["## Snapshot", brief["snapshot"], ""]
    md += ["## What's Happening"]
    md += [f"- {p}" for p in brief["whats_happening"]]
    md += ["", "## Talking Points"]
    md += [f"- {p}" for p in brief["talking_points"]]
    md += ["", "## Questions to Ask"]
    md += [f"- {q}" for q in brief["questions_to_ask"]]
    md += ["", "---", "## Sources"]
    md += [f"[{i}] {a['url']}" for i, a in enumerate(articles, 1)]
    return "\n".join(md)


def main():
    data = get_input()
    queries = build_queries(data["bank_name"], data["cto_name"])
    raw = search(queries)
    articles = filter_results(raw)

    cleaned = []
    for a in articles:
        result = fetch_and_clean(a["url"])
        if result:
            cleaned.append(result)

    brief = summarize(cleaned, data["bank_name"], data["cto_name"])
    md = format_markdown(brief, cleaned)

    os.makedirs("briefs", exist_ok=True)
    filename = f"briefs/{data['bank_name'].replace(' ','_')}_{data['cto_name'].replace(' ','_')}.md"
    with open(filename, "w") as f:
        f.write(md)
    print(f"\n✅ Brief saved: {filename}")


if __name__ == "__main__":
    main()
