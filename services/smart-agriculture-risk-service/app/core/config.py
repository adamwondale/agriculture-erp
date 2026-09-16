from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "Smart Agriculture & Risk Analytics Service"
    API_V1_STR: str = "/api/v1"
    PORT: int = 5013
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/agri_smart_agriculture_risk_db"
    SYNC_DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/agri_smart_agriculture_risk_db"
    
    # RabbitMQ
    RABBITMQ_URL: str = "amqp://guest:guest@localhost:5672/"
    EXCHANGE_NAME: str = "smartag.events.exchange"
    
    # JWT Security (issued by CoreAdmin)
    JWT_SECRET_KEY: str = "super-secret-key-at-least-32-chars-long-12345!"
    JWT_ALGORITHM: str = "HS256"
    JWT_ISSUER: str = "AgricultureErp.CoreAdmin"
    JWT_AUDIENCE: str = "AgricultureErp"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
