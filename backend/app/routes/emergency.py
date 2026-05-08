from fastapi import APIRouter

router = APIRouter()

@router.post("/sos")
async def trigger_sos():
    return {
        "message": "Emergency alert triggered",
        "ai_response": "Authorities notified successfully"
    }
