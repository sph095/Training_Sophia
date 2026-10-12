python -m venv .venv
.venv\Scripts\Activate.ps1
deactivate

pip install -r requirements.txt
python app.py


config.py holds every tunable, so swapping models or limits is a one-line edit.
prompts.py isolates the system prompt as content.
tools/ splits search from scraping; __init__.py re-exports both so agent.py imports stay short.
templates/brief.html gets the CSS out of Python — and uses single braces, which fixes the broken stylesheet.
render.py owns the Markdown→HTML step.
app.py is now only UI and file output.
output/ is created at startup so briefs don't clutter the project root.