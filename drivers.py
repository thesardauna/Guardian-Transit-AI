from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def drivers_home():
    return {"message": "Drivers route active"}
