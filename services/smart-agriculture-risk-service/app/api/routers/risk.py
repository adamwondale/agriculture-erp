from fastapi import APIRouter, Depends
import uuid
from app.models.schemas.telemetry import RiskAssessmentResponse
from app.services.risk_scoring import RiskScoringService
from app.core.security import verify_token

router = APIRouter(prefix="/risk", tags=["Risk Scoring"], dependencies=[Depends(verify_token)])

@router.get("/score/{parcel_id}")
async def get_parcel_risk(parcel_id: uuid.UUID, ndvi: float = 0.6, moisture: float = 50.0):
    score, category = RiskScoringService.calculate_risk(ndvi, moisture)
    return {
        "parcel_id": parcel_id,
        "composite_risk_score": score,
        "risk_category": category,
        "status": "Computed"
    }
