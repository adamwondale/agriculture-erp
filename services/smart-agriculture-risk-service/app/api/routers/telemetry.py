from fastapi import APIRouter, Depends
import uuid
from typing import List
from app.models.schemas.telemetry import TelemetryCreate, TelemetryResponse
from app.services.telemetry_ingestion import TelemetryIngestionService
from app.core.security import verify_token

router = APIRouter(prefix="/telemetry", tags=["Telemetry"], dependencies=[Depends(verify_token)])

@router.post("/pull/{parcel_id}", response_model=TelemetryCreate)
async def pull_parcel_telemetry(parcel_id: uuid.UUID):
    return await TelemetryIngestionService.pull_satellite_data(parcel_id)
