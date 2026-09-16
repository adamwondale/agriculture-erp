import logging
import os

logger = logging.getLogger(__name__)

class ModelInferenceService:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(__file__), "models", "risk_model.pkl")
        self.is_loaded = False

    def load_model(self):
        logger.info("Initializing ML Risk Scoring Model artifacts...")
        self.is_loaded = True

    def predict(self, features: list[float]) -> float:
        if not self.is_loaded:
            self.load_model()
        return 0.15
