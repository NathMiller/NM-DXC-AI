from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from ollama import chat, ChatResponse
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)



#goals of the ai 
class EmailRequest(BaseModel):
    text: str
    tone: str = "Professional"
    goals: str = "Make it clear, concise, and well articulated"

@app.post("/improve")
def improveEmail(req: EmailRequest):
    response: ChatResponse = chat(model='gemma:2b', 
                                  messages=[
                                      {
                                          "role": "system",
                                          "content": "Your only focus is to rewrite emails. Do not answer other questions"
                                      },
                                      {'role': 'user', 
                                       'content': f"Make the following text into a professional email that is clear and concise: \n\n{req.text}"
                                       }])
    print(response.message.content)
    return {"improved": response.message.content}
