import os
import json
import google.generativeai as genai

# Load API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-1.5-flash")


class GeminiService:
    """
    Handles all LLM-powered intelligence:
    - Risk analysis
    - Incident summarization
    - Safety recommendations
    - Natural language explanations
    """

    def analyze_trip_risk(self, trip_data: dict) -> dict:
        prompt = f"""
        You are an AI Transport Safety Agent.

        Analyze this trip data and detect risk level:

        Trip Data:
        {json.dumps(trip_data, indent=2)}

        Return ONLY valid JSON:
        {{
            "risk_level": "low | medium | high",
            "reason": "...",
            "recommendation": "...",
            "alert_needed": true/false
        }}
        """

        response = model.generate_content(prompt)
        return self._safe_parse(response.text)

    def summarize_incident(self, incident_text: str) -> dict:
        prompt = f"""
        You are an AI emergency response assistant.

        Convert this passenger report into a structured incident report:

        "{incident_text}"

        Return ONLY JSON:
        {{
            "summary": "...",
            "severity": "low | medium | high",
            "action_required": "...",
            "keywords": []
        }}
        """

        response = model.generate_content(prompt)
        return self._safe_parse(response.text)

    def recommend_safest_route(self, routes: list) -> dict:
        prompt = f"""
        You are a mobility safety AI.

        Choose the safest route from the options below:

        Routes:
        {json.dumps(routes, indent=2)}

        Return ONLY JSON:
        {{
            "best_route_index": 0,
            "reason": "...",
            "risk_analysis": "..."
        }}
        """

        response = model.generate_content(prompt)
        return self._safe_parse(response.text)

    def safety_chat(self, message: str) -> str:
        prompt = f"""
        You are Guardian Transit AI assistant.

        Answer this passenger safety question clearly and briefly:

        {message}
        """

        response = model.generate_content(prompt)
        return response.text

    def _safe_parse(self, text: str) -> dict:
        """
        Ensures JSON safety from LLM output
        """
        try:
            cleaned = text.replace("```json", "").replace("```", "")
            return json.loads(cleaned)
        except Exception:
            return {
                "error": "Failed to parse AI response",
                "raw": text
            }
