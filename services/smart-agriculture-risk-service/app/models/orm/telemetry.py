import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Boolean, DateTime, Enum as SAEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
import enum

Base = declarative_base()

class RiskCategoryEnum(str, enum.Enum):
    LOW = "Low"
    MODERATE = "Moderate"
    HIGH = "High"
    CRITICAL = "Critical"

class MitigationStatusEnum(str, enum.Enum):
    PENDING = "Pending"
    IN_PROGRESS = "InProgress"
    MITIGATED = "Mitigated"
    REJECTED = "Rejected"

class SmartAgTelemetry(Base):
    __tablename__ = "smart_ag_telemetry"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    capture_date = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    ndvi_score = Column(Float, nullable=False)
    soil_moisture_index = Column(Float, nullable=False)
    anomaly_flag = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    parcel_id = Column(UUID(as_uuid=True), nullable=False, index=True)
    composite_risk_score = Column(Float, nullable=False)
    risk_category = Column(SAEnum(RiskCategoryEnum), nullable=False)
    mitigation_status = Column(SAEnum(MitigationStatusEnum), default=MitigationStatusEnum.PENDING, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)
