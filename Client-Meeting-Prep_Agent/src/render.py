from pathlib import Path

import markdown

TEMPLATE_PATH = Path(__file__).parent / "templates" / "brief.html"
HTML_EXPORT_TEMPLATE = TEMPLATE_PATH.read_text(encoding="utf-8")


def render_brief_html(md_result: str) -> str:
    """Convert the agent's Markdown brief into a standalone printable HTML page."""
    html_body = markdown.markdown(md_result, extensions=["extra", "nl2br"])
    return HTML_EXPORT_TEMPLATE.replace("{content}", html_body)
