from pydantic import BaseModel

class EmailRequest(BaseModel):
    text: str
    tone: str = "Professional"
    goals: str = "Make it clear, concise, and well articulated"