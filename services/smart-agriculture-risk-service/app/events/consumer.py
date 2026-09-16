import logging

logger = logging.getLogger(__name__)

class EventConsumer:
    @staticmethod
    async def start_listening():
        logger.info("Smart Agriculture RabbitMQ consumer registered.")
