vsc -> install python extension
create folder client-meeting-prep-agent
inside the folder create 2 files and one folder ie brief(for outputs)
2 files -> agent.py, requirements.txt

inside agent put the code to get input
inside requirements write the names of the libs to be installed 
the run this in the terminal

pip install -r requirements.txt
python agent.py

SEARCH LAYER

Tavily setup:

pip install tavily-python
export TAVILY_API_KEY="your_key_here"


pip install tavily-python

how to set env variable permanently -> in shell run this cmd
echo %TAVILY_API_KEY%

Read and execute tavily.com/agent-setup/SKILL.md 
Tavily thantha prompt

Install Python, if you don't have it — python.org, during install tick "Add Python to PATH" 

then i pasted all code in agent.py

to check if the env variable has a value ie is set
echo %GEMINI_API_KEY%
run the cmd in terminal

set up google gemini
pip install google-generativeai
changed the code and set env
setx GEMINI_API_KEY "YOUR_GEMINI_KEY"
the api keys didn't work so eco thought teh gemini model was unavailable,
so then i ru the test_avmodel.py the put the model name in the agent.py code

the api keys aren't reading so ramana suggested to create a env file and pass the apikey 

in terminal >> pip install python-dotenv
load in code at top of agent.py