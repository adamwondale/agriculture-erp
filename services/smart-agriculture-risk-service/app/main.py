from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.config import settings
from app.api.routers import telemetry, risk
from app.workers.scheduled_jobs import start_scheduler
from app.events.consumer import EventConsumer

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        start_scheduler()
        await EventConsumer.start_listening()
    except Exception as e:
        print(f"Startup warning: {e}")
    yield
    # Shutdown

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "Healthy",
        "service": "smart-agriculture-risk-service",
        "database": "agri_smart_agriculture_risk_db",
        "framework": "FastAPI (Python 3.11)"
    }

app.include_router(telemetry.router, prefix=settings.API_V1_STR)
app.include_router(risk.router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)
