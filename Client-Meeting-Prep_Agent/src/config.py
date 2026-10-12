import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("Missing GROQ_API_KEY in .env file.")

MODEL_NAME = "qwen/qwen3.8-27b"
TEMPERATURE = 0.2
RECURSION_LIMIT = 12

SEARCH_MAX_RESULTS = 4
FETCH_TIMEOUT = 12
FETCH_CHAR_LIMIT = 3000
