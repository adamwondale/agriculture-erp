import logging
from app.models.orm.telemetry import RiskCategoryEnum

logger = logging.getLogger(__name__)

class RiskScoringService:
    @staticmethod
    def calculate_risk(ndvi: float, moisture: float, pest_detected: bool = False) -> tuple[float, RiskCategoryEnum]:
        score = (1.0 - max(0.0, ndvi)) * 50 + (100.0 - moisture) * 0.4
        if pest_detected:
            score += 20.0
        
        score = min(100.0, max(0.0, score))
        if score < 25.0:
            cat = RiskCategoryEnum.LOW
        elif score < 50.0:
            cat = RiskCategoryEnum.MODERATE
        elif score < 75.0:
            cat = RiskCategoryEnum.HIGH
        else:
            cat = RiskCategoryEnum.CRITICAL
        return round(score, 2), cat
