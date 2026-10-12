from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent

from .config import GROQ_API_KEY, MODEL_NAME, RECURSION_LIMIT, TEMPERATURE
from .prompts import SYSTEM_PROMPT
from .tools import fetch_page_content, search_web

llm = ChatGroq(
    model=MODEL_NAME,
    temperature=TEMPERATURE,
    api_key=GROQ_API_KEY,
)

agent_executor = create_react_agent(
    model=llm,
    tools=[search_web, fetch_page_content],
    prompt=SYSTEM_PROMPT,
)


def run_prep_agent(user_query: str) -> str:
    response = agent_executor.invoke(
        {"messages": [("user", user_query)]},
        config={"recursion_limit": RECURSION_LIMIT},
    )
    return response["messages"][-1].content
