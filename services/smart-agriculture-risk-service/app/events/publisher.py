import json
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)

class EventPublisher:
    @staticmethod
    async def publish_event(routing_key: str, payload: dict):
        logger.info(f"Publishing event to {settings.EXCHANGE_NAME} with key {routing_key}: {payload}")
