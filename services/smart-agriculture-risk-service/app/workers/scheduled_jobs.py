import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler

logger = logging.getLogger(__name__)
scheduler = AsyncIOScheduler()

def start_scheduler():
    scheduler.add_job(poll_satellite_ndvi_feed, "interval", minutes=60, id="satellite_ndvi_poll")
    scheduler.start()
    logger.info("Background telemetry APScheduler started.")

async def poll_satellite_ndvi_feed():
    logger.info("Running background scheduled NDVI & Weather telemetry sweep...")
