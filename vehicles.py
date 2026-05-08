from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def vehicles_home():
    return {"message": "Vehicles route active"}
