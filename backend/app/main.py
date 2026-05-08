from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router
from app.routes.trips import router as trips_router
from app.routes.drivers import router as drivers_router
from app.routes.vehicles import router as vehicles_router
from app.routes.emergency import router as emergency_router
from app.routes.recommendations import router as recommendations_router
from app.routes.ai import router as ai_router

app = FastAPI(
    title="Guardian Transit AI API",
    description="AI-powered transport safety and monitoring platform",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint
@app.get("/")
async def root():
    return {
        "message": "Guardian Transit AI Backend Running",
        "status": "online",
        "version": "1.0.0"
    }

# Health Check
@app.get("/health")
async def health_check():
    return {
        "server": "healthy",
        "ai_agents": "active",
        "tracking_system": "running"
    }

# Register Routes
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])

app.include_router(trips_router, prefix="/api/trips", tags=["Trips"])

app.include_router(drivers_router, prefix="/api/drivers", tags=["Drivers"])

app.include_router(vehicles_router, prefix="/api/vehicles", tags=["Vehicles"])

app.include_router(emergency_router, prefix="/api/emergency", tags=["Emergency"])

app.include_router(
    recommendations_router,
    prefix="/api/recommendations",
    tags=["Recommendations"]
)

app.include_router(ai_router, prefix="/api/ai", tags=["AI Agents"])
