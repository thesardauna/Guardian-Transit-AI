from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def ai_home():
    return {
        "message": "AI agents operational"
    }
