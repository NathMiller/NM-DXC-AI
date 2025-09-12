from fastapi import FastAPI
from ollama import chat, ChatResponse
from pydantic import BaseModel

app = FastAPI()

@app.get("/improve")
def improveEmail():
    response: ChatResponse = chat(model='llama3', messages=[{'role': 'user', 'content': "Ten restaurants to visit in Newcastle? Names only"}])
    print(response.message.content)
    return {"response": response.message.content}
