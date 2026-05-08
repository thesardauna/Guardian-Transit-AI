from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_trips():
    return {
        "message": "Trips endpoint working",
        "trips": []
    }

@router.post("/start")
async def start_trip():
    return {
        "message": "Trip started successfully",
        "status": "active"
    }
