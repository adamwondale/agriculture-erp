import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from app.models.orm.telemetry import RiskCategoryEnum, MitigationStatusEnum

class TelemetryCreate(BaseModel):
    parcel_id: uuid.UUID
    ndvi_score: float = Field(..., ge=-1.0, le=1.0)
    soil_moisture_index: float = Field(..., ge=0.0, le=100.0)
    anomaly_flag: bool = False

class TelemetryResponse(BaseModel):
    id: uuid.UUID
    parcel_id: uuid.UUID
    capture_date: datetime
    ndvi_score: float
    soil_moisture_index: float
    anomaly_flag: bool

    class Config:
        from_attributes = True

class RiskAssessmentCreate(BaseModel):
    parcel_id: uuid.UUID
    composite_risk_score: float
    risk_category: RiskCategoryEnum
    mitigation_status: MitigationStatusEnum = MitigationStatusEnum.PENDING

class RiskAssessmentResponse(BaseModel):
    id: uuid.UUID
    parcel_id: uuid.UUID
    composite_risk_score: float
    risk_category: RiskCategoryEnum
    mitigation_status: MitigationStatusEnum
    created_at: datetime

    class Config:
        from_attributes = True
