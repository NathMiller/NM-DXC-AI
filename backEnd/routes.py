from fastapi import APIRouter
from services import improveEmail
from models import EmailRequest

router = APIRouter()



@router.post("/improve")
async def improve_email(req: EmailRequest):
    displayResponse = improveEmail(req.text)
    return {"improved": displayResponse}