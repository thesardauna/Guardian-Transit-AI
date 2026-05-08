from app.services.gemini_service import GeminiService


class PassengerSafetyAgent:
    """
    AI Agent responsible for:
    - Monitoring trip behavior
    - Detecting risks in real time
    - Triggering safety recommendations
    - Coordinating emergency escalation
    """

    def __init__(self):
        self.ai = GeminiService()

    def evaluate_trip(self, trip_data: dict) -> dict:
        """
        Analyze live trip data and determine safety status.
        """
        ai_result = self.ai.analyze_trip_risk(trip_data)

        risk_level = ai_result.get("risk_level", "low")

        decision = {
            "trip_id": trip_data.get("trip_id"),
            "risk_level": risk_level,
            "alert_triggered": False,
            "message": ai_result.get("reason", ""),
            "recommendation": ai_result.get("recommendation", "")
        }

        # Agent decision logic
        if risk_level in ["medium", "high"]:
            decision["alert_triggered"] = True

        return decision

    def monitor_route_deviation(self, expected_route: list, actual_route: list) -> dict:
        """
        Detect if vehicle deviates from expected route.
        """

        prompt_data = {
            "expected_route": expected_route,
            "actual_route": actual_route
        }

        result = self.ai.analyze_trip_risk(prompt_data)

        return {
            "deviation_detected": result.get("risk_level") in ["medium", "high"],
            "analysis": result.get("reason"),
            "severity": result.get("risk_level")
        }

    def generate_safety_score(self, driver_data: dict, trip_history: list) -> dict:
        """
        Computes intelligent safety score using AI reasoning.
        """

        prompt_data = {
            "driver": driver_data,
            "history": trip_history
        }

        result = self.ai.analyze_trip_risk(prompt_data)

        return {
            "driver_id": driver_data.get("id"),
            "safety_score": self._convert_risk_to_score(result),
            "reason": result.get("reason")
        }

    def emergency_decision(self, incident_text: str) -> dict:
        """
        Determines emergency severity and action plan.
        """
        result = self.ai.summarize_incident(incident_text)

        return {
            "severity": result.get("severity"),
            "action_required": result.get("action_required"),
            "auto_dispatch": result.get("severity") == "high",
            "summary": result.get("summary")
        }

    def _convert_risk_to_score(self, ai_result: dict) -> float:
        """
        Converts AI risk output into numeric safety score.
        """
        risk = ai_result.get("risk_level", "low")

        if risk == "low":
            return 90.0
        elif risk == "medium":
            return 70.0
        elif risk == "high":
            return 40.0
        return 80.0
